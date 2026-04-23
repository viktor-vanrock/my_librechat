import { Response } from 'express';
import openrouterBalanceService from '../services/openRouterStatisticsService.js';
import type { ServerRequest } from '~/types/http.js';
import { getUserOpenRouterKey } from './utils.js';
import { AppError } from '../utils.js';

class OpenRouterStatisticsController {
  async getBalance(req: ServerRequest, res: Response): Promise<void> {
    const userId = req.user?.id;

    try {
      const openRouterKey = await getUserOpenRouterKey(userId);
      
      if (!openRouterKey) {
        throw new AppError(
          'OpenRouter ключ не найден.',
          400,
          'OPENROUTER_KEY_NOT_FOUND'
        );
      }

      const statistics = await openrouterBalanceService.getBalance(openRouterKey);

      res.json({
        data: statistics,
      });
      
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
        return;
      }

      res.status(500).json({ 
        success: false,
        error: 'Внутренняя ошибка сервера' 
      });
    }
  }
}

export default new OpenRouterStatisticsController();