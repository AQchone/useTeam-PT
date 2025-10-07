import { Controller, Post } from '@nestjs/common';
import fetch from 'node-fetch';

@Controller('export')
export class ExportController {
  @Post('backlog')
  async triggerExport() {
    const webhookUrl = process.env.N8N_WEBHOOK_URL ?? '';
    if (!webhookUrl) {
      return { ok: false, error: 'N8N_WEBHOOK_URL no está configurada' };
    }
    try {
      const res = await fetch(webhookUrl, { method: 'POST' });
      return { ok: res.ok };
    } catch (e) {
      return { ok: false, error: 'No se pudo contactar el webhook de N8N' };
    }
  }
}

