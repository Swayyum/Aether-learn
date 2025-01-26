import express from 'express';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const assessments = await prisma.assessment.findMany({
      include: {
        progress: {
          where: {
            userId: req.user.id
          }
        }
      }
    });
    
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:assessmentId/start', async (req, res) => {
  try {
    const { assessmentId } = req.params;
    
    const progress = await prisma.progress.create({
      data: {
        userId: req.user.id,
        assessmentId,
      }
    });
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:assessmentId/complete', async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const { score } = req.body;
    
    const progress = await prisma.progress.update({
      where: {
        userId_assessmentId: {
          userId: req.user.id,
          assessmentId
        }
      },
      data: {
        score,
        completed: true,
        completedAt: new Date()
      }
    });
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;