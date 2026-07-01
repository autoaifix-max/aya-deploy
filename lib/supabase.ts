import { createClient } from '@supabase/supabase-js'

const SUPA_URL = 'https://vwzppnjxbmkdknzxyrle.supabase.co'
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3enBwbmp4Ym1rZGtuenh5cmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NzA3OTEsImV4cCI6MjA5ODI0Njc5MX0.ClasZhTrDgt3ku8n88vhc3dxmPu2ZbVsoEu2uzLYBfY'

export const supabase = createClient(SUPA_URL, SUPA_KEY)
