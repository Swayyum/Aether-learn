import express from 'express';
import { PythonShell } from 'python-shell';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

// In-memory test definitions (in production, store in database)
const projectTests = {
  'sentiment-analysis': {
    testCases: [
      {
        input: 'This movie was fantastic!',
        expectedOutput: 'positive',
        description: 'Test positive sentiment'
      },
      {
        input: 'I really hated this product.',
        expectedOutput: 'negative',
        description: 'Test negative sentiment'
      }
    ],
    setupCode: `
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

def load_model():
    tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
    model = AutoModelForSequenceClassification.from_pretrained("bert-base-uncased")
    return tokenizer, model

def predict_sentiment(text):
    tokenizer, model = load_model()
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    outputs = model(**inputs)
    predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
    return "positive" if predictions[0][1] > 0.5 else "negative"
`
  }
};

const createTempFile = async (code, filename) => {
  const tempDir = path.join(process.cwd(), 'temp');
  await fs.mkdir(tempDir, { recursive: true });
  const filePath = path.join(tempDir, filename);
  await fs.writeFile(filePath, code);
  return filePath;
};

router.post('/run', async (req, res) => {
  const { code, language, projectId } = req.body;
  const filename = `${uuidv4()}.${language === 'python' ? 'py' : 'js'}`;

  try {
    const filePath = await createTempFile(code, filename);

    if (language === 'python') {
      const result = await new Promise((resolve, reject) => {
        PythonShell.run(filePath, null, (err, output) => {
          if (err) reject(err);
          resolve(output);
        });
      });

      await fs.unlink(filePath);
      res.json({ output: result.join('\n') });
    } else {
      // Handle other languages
      res.status(400).json({ error: 'Unsupported language' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/test', async (req, res) => {
  const { code, projectId } = req.body;
  const project = projectTests[projectId];

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  try {
    const filename = `${uuidv4()}.py`;
    const testCode = `
${project.setupCode}

# User code
${code}

# Test cases
def run_tests():
    results = []
    ${project.testCases.map((test, i) => `
    try:
        result = predict_sentiment(${JSON.stringify(test.input)})
        passed = result == ${JSON.stringify(test.expectedOutput)}
        results.append({
            'passed': passed,
            'message': result if not passed else 'Test passed'
        })
    except Exception as e:
        results.append({
            'passed': False,
            'message': str(e)
        })
    `).join('\n')}
    return results

print(run_tests())
`;

    const filePath = await createTempFile(testCode, filename);
    
    const result = await new Promise((resolve, reject) => {
      PythonShell.run(filePath, null, (err, output) => {
        if (err) reject(err);
        resolve(output);
      });
    });

    await fs.unlink(filePath);
    
    // Parse the test results
    const testResults = eval(result[result.length - 1]);
    res.json(testResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;