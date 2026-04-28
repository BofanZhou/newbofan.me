import type { BlogPost } from './types'

export const blogPosts: BlogPost[] = [
  {
    id: 'why-bofan',
    slug: 'why-bofan',
    title: { zh: '我为什么要搭建 bofan 个人网站', en: 'Why I Built bofan' },
    description: { zh: '从个人展示、技术博客、项目复盘到长期成长记录，这个网站是我的数字空间起点。', en: 'A starting point for portfolio, technical writing, project reviews, and long-term growth records.' },
    date: '2026-04-20',
    category: { zh: '项目记录', en: 'Project Logs' },
    tags: ['Portfolio', 'Vue', 'Growth'],
    lang: 'both',
    content: {
      zh: 'bofan 不只是一个简历页面。我希望它成为一个长期更新的数字空间，把学习、项目、代码、摄影和生活记录放在同一个清晰的界面里。第一版先完成结构和内容，后续会加入 Markdown 博客、GitHub 自动更新和更多作品细节。',
      en: 'bofan is more than a resume page. I want it to become a long-term digital space where learning, projects, code, photography, and life records can live together. The first version focuses on structure and content, with Markdown blogs and GitHub automation planned later.',
    },
  },
  {
    id: 'rebound-phase-one',
    slug: 'rebound-cloud-control-phase-one',
    title: { zh: 'Rebound Cloud Control 第一阶段开发记录', en: 'Development Log of Rebound Cloud Control: Phase One' },
    description: { zh: '记录从工程需求到 Web 原型闭环的第一阶段开发过程。', en: 'A phase-one log about turning engineering requirements into a web prototype loop.' },
    date: '2026-04-18',
    category: { zh: '项目记录', en: 'Project Logs' },
    tags: ['Vue', 'Engineering', 'Prototype'],
    lang: 'both',
    content: {
      zh: '第一阶段重点是把复杂工程流程拆成可操作的前端任务：参数输入、推荐展示、设备状态、任务提交和结果回采。这个过程让我更清楚地理解了工程软件不只是页面，而是问题、流程和反馈的组织方式。',
      en: 'The first phase focused on translating a complex engineering workflow into usable frontend tasks: parameter input, recommendation display, device status, task submission, and result feedback. It helped me understand engineering software as the organization of problems, workflows, and feedback.',
    },
  },
  {
    id: 'thermal-comfort-ai',
    slug: 'thermal-comfort-ai',
    title: { zh: 'Python 人工智能入门：从热舒适预测开始', en: 'Getting Started with AI Programming: Thermal Comfort Prediction' },
    description: { zh: '用建筑环境问题作为入口，理解数据、模型训练和结果分析。', en: 'Using a building environment problem to understand data, model training, and result analysis.' },
    date: '2026-04-15',
    category: { zh: 'AI 入门', en: 'AI Fundamentals' },
    tags: ['Python', 'PyTorch', 'Building Energy'],
    lang: 'both',
    content: {
      zh: '热舒适预测让我把 AI 学习和专业背景联系起来。相比只看模型公式，我更关心输入数据如何描述真实环境，以及预测结果如何帮助人理解和优化空间。',
      en: 'Thermal comfort prediction connects AI learning with my major background. Instead of only looking at formulas, I care about how input data describes real environments and how predictions can help people understand and optimize spaces.',
    },
  },
  {
    id: 'vue-vite-notes',
    slug: 'vue-vite-project-notes',
    title: { zh: 'Vue 3 + Vite 项目搭建记录', en: 'Building a Vue 3 + Vite Project from Scratch' },
    description: { zh: '记录个人网站第一版的技术栈选择、目录结构和可维护性考虑。', en: 'Notes about tech stack choices, project structure, and maintainability for the first website version.' },
    date: '2026-04-12',
    category: { zh: 'Web 开发', en: 'Web Development' },
    tags: ['Vue 3', 'Vite', 'TypeScript'],
    lang: 'both',
    content: {
      zh: '第一版采用 Vue 3、Vite、TypeScript、Tailwind CSS 和静态数据文件。这样可以先把内容结构跑通，同时为后续博客系统、GitHub 数据和部署优化留下扩展空间。',
      en: 'The first version uses Vue 3, Vite, TypeScript, Tailwind CSS, and static data files. This makes the content structure easy to ship while leaving room for future blogs, GitHub data, and deployment optimization.',
    },
  },
]
