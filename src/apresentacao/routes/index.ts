import { Router } from 'express';
import productRoutes from './productRoutes';

const router = Router();

router.use('/products', productRoutes);

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API está funcionando',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

export default router;