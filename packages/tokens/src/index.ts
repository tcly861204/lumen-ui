/**
 * Lumen UI 设计 Token 入口
 *
 * 提供两套设计变量：
 * 1. SCSS 变量（编译期）：用于色值混合、计算等场景
 * 2. CSS 变量（运行期）：用于主题切换、动态换肤
 *
 * 使用方式：
 *   // SCSS：
 *   @use '@lumen/tokens/scss/variables' as *;
 *   .x { color: $l-color-primary; }
 *
 *   // CSS 变量：
 *   import '@lumen/tokens/css/variables.css';
 *   .x { color: var(--l-color-primary); }
 */

export const VERSION = '0.0.0'
