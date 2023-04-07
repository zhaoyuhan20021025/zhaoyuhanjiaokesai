import { defineConfig } from 'vite'
import { convertExcelFileToJsonUsingXlsx } from './convert-xlsx-to-json';
export default defineConfig(()=>{
    convertExcelFileToJsonUsingXlsx();
    return {};
})