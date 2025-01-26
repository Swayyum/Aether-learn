import { Brain, LineChart, GitBranch, Code2, Target, ChartBar } from 'lucide-react';

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  content: string;
  code?: string;
  image?: string;
  exercises?: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  prerequisites: string[];
  learningObjectives: string[];
  modules: Module[];
}

const MLFoundationsCourse: Course = {
  id: 'foundations',
  title: 'ML Foundations',
  description: 'Master the fundamentals of Machine Learning with hands-on implementations',
  level: 'Beginner',
  duration: '12 hours',
  prerequisites: [
    'Basic Python programming',
    'High school mathematics',
    'Basic linear algebra understanding'
  ],
  learningObjectives: [
    'Understand core ML concepts and terminology',
    'Implement linear regression from scratch',
    'Master gradient descent optimization',
    'Learn model evaluation techniques',
    'Build practical ML pipelines'
  ],
  modules: [
    {
      id: 'intro',
      title: 'Introduction to Machine Learning',
      description: 'Understanding the basics of ML and its applications',
      duration: '1 hour',
      topics: [
        'Types of Machine Learning',
        'Supervised Learning Fundamentals',
        'ML Workflow Overview',
        'Training and Prediction'
      ],
      content: `
# Introduction to Machine Learning

Machine Learning is a subset of artificial intelligence that focuses on developing systems that can learn from and make decisions based on data. Unlike traditional programming where we explicitly define rules, ML algorithms learn patterns from data to make predictions or decisions.

## Types of Machine Learning

1. **Supervised Learning**
   - Uses labeled examples with direct feedback
   - Most common approach in practical applications
   - Examples: Classification, Regression
   - Training process involves direct feedback loop

2. **Unsupervised Learning**
   - No labeled data or feedback
   - Focuses on finding patterns and structures
   - Example: Clustering

3. **Reinforcement Learning**
   - Indirect feedback after many examples
   - Agent learns through trial and error
   - Rewards and penalties guide learning

4. **Semi-supervised Learning**
   - Combines labeled and unlabeled data
   - Reduces need for large labeled datasets
   - Popular in deep learning applications

5. **Self-supervised Learning**
   - Creates supervised signals from unlabeled data
   - Emerging approach in modern deep learning
   - Example: Language model pre-training

## Supervised Learning Framework

### Training Phase
1. Collect labeled training data
2. Feed data into ML algorithm
3. Algorithm learns patterns
4. Creates trained model

### Prediction Phase
1. Receive new, unseen data
2. Apply trained model
3. Generate predictions

## Classification vs Regression

### Classification
- Predicts categorical outputs (discrete classes)
- Examples:
  - Email spam detection (spam/not spam)
  - Image recognition (cat/dog/bird)
  - Medical diagnosis (disease/no disease)

### Regression
- Predicts continuous numerical values
- Examples:
  - House price prediction
  - Stock market forecasting
  - Temperature prediction

## Key Differences
1. **Output Type**
   - Classification: Discrete categories
   - Regression: Continuous values

2. **Evaluation Metrics**
   - Classification: Accuracy, Precision, Recall
   - Regression: MSE, RMSE, MAE

3. **Applications**
   - Classification: Pattern recognition, Decision making
   - Regression: Forecasting, Estimation

## Real-World Applications

1. **Financial Sector**
   - Stock price prediction (Regression)
   - Fraud detection (Classification)
   - Credit risk assessment (Classification)

2. **Healthcare**
   - Disease diagnosis (Classification)
   - Patient outcome prediction (Regression)
   - Medical image analysis (Classification)

3. **Technology**
   - Facial recognition (Classification)
   - Recommendation systems (Both)
   - Natural language processing (Both)

## Best Practices

1. **Data Quality**
   - Clean and preprocess data
   - Handle missing values
   - Remove outliers
   - Normalize/standardize features

2. **Model Selection**
   - Choose appropriate algorithm
   - Consider problem complexity
   - Balance accuracy vs. complexity
   - Account for data size and type

3. **Validation**
   - Use cross-validation
   - Test on unseen data
   - Monitor for overfitting
   - Validate assumptions
      `,
      image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=1000',
      exercises: [
        {
          question: 'Which type of learning uses labeled examples with direct feedback?',
          options: [
            'Unsupervised Learning',
            'Supervised Learning',
            'Reinforcement Learning',
            'Self-supervised Learning'
          ],
          correctAnswer: 1
        },
        {
          question: 'What type of problem would stock market prediction typically be?',
          options: [
            'Classification',
            'Clustering',
            'Regression',
            'Reinforcement Learning'
          ],
          correctAnswer: 2
        },
        {
          question: 'Which of the following is NOT a type of supervised learning problem?',
          options: [
            'Email spam detection',
            'House price prediction',
            'Customer segmentation',
            'Disease diagnosis'
          ],
          correctAnswer: 2
        }
      ]
    },
    // ... (keep existing modules)
  ]
};

export default MLFoundationsCourse;