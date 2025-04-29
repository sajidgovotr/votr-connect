import StackBarChartConfig from './chart-configs';
const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

console.log(import.meta.env, 'import.meta.env');
export {
    StackBarChartConfig,
    baseURL
}