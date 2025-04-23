"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
var supabase_js_1 = require("@supabase/supabase-js");
// URL do projeto e chave pública (ANON_KEY) do Supabase
var supabaseUrl = process.env.SUPABASE_URL || '';
var supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
// Inicializa o cliente do Supabase
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);
