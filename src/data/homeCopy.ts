import type { Locale } from './types'

type LocalizedText = Record<Locale, string>
type LocalizedList = Record<Locale, string[]>

export const heroCopy: Record<
  Locale,
  {
    lead: string
    body: string
    focusLabel: string
    buildingLabel: string
    buildingLine: string
    modeLabel: string
    modeValue: string
  }
> = {
  zh: {
    lead: '我在学习 AI 编程、Web 开发和工程数据分析，也正在尝试把它们带回建筑能源问题里。',
    body: '这里放着我的项目、文章、代码记录和摄影。',
    focusLabel: '关注',
    buildingLabel: '正在建设',
    buildingLine: 'AI · Web · Energy · Life',
    modeLabel: '状态',
    modeValue: '边学边做',
  },
  en: {
    lead: 'I study AI programming, web development, and engineering data analysis, and I am trying to bring them back to building energy questions.',
    body: 'This site gathers my projects, notes, code, and photography.',
    focusLabel: 'focus',
    buildingLabel: 'building',
    buildingLine: 'AI · Web · Energy · Life',
    modeLabel: 'mode',
    modeValue: 'learning by building',
  },
}

export const aboutCopy: Record<Locale, string[]> = {
  zh: [
    '我是 Bofan，中国矿业大学建筑环境与能源应用工程专业本科生，正在学习 AI 编程、Web 开发和工程数据分析。',
    '我喜欢尝试各种新鲜的事物，也在努力跟随时代的变化。',
    '这个网站用于记录我的项目、博客、代码和摄影。于我而言，它更像是一个见证，提醒我回望来时的路，也激励着我更好地远足。',
  ],
  en: [
    'I am Bofan, an undergraduate student in Building Environment and Energy Application Engineering at CUMT.',
    'I enjoy trying out new things and strive to keep up with the changing times.',
    'This site records my projects, blog, code, and photography. To me, it is more like a witness—reminding me to look back at where I came from, and inspiring me to journey further ahead.',
  ],
}

export const sectionIntroCopy: Record<
  'tech' | 'honors' | 'code' | 'updates' | 'blog' | 'photography',
  LocalizedText
> = {
  tech: {
    zh: '我主要在学习 Python、AI 编程、前端开发和数据分析。目标很简单：把数据处理、模型实验和网页展示连成能用的作品。',
    en: 'I focus on Python, AI programming, front-end development, and data analysis, then connect them into usable projects.',
  },
  honors: {
    zh: '一些阶段性成果，记录学习、项目和校园参与。',
    en: 'A few milestones from learning, projects, and campus work.',
  },
  code: {
    zh: '这里同步我的 GitHub 公开数据，记录我正在写的项目、常用语言和最近更新。',
    en: 'A live look at my public GitHub work: projects, languages, and recent updates.',
  },
  updates: {
    zh: '这里放最近的学习、项目和创作。',
    en: 'Recent learning, projects, and creative work.',
  },
  blog: {
    zh: '我会把学习笔记、项目复盘和工程里的小问题写在这里，方便之后回看。',
    en: 'Notes on learning, project reviews, and small engineering questions I want to remember.',
  },
  photography: {
    zh: '摄影是我观察生活的方式。这里通向我的作品集，记录风景、人物和日常细节。',
    en: 'Photography is how I slow down and notice life. This leads to my gallery of places, people, and everyday details.',
  },
}

export const projectFeatureCopy: Record<
  Locale,
  {
    label: string
    panelTitle: string
    link: string
  }
> = {
  zh: {
    label: '精选项目',
    panelTitle: '从想法到可用原型',
    link: '查看项目',
  },
  en: {
    label: 'Featured',
    panelTitle: 'From idea to usable prototype',
    link: 'View project',
  },
}

export const homeProjectCopy: Record<
  string,
  {
    short: LocalizedText
    description?: LocalizedText
    highlights?: LocalizedList
  }
> = {
  'rebound-cloud-control': {
    short: {
      zh: '把工程回弹补偿做成可操作、可查看的 Web 原型。',
      en: 'A web prototype that makes rebound compensation easier to operate and review.',
    },
    description: {
      zh: '面向钢管弯折回弹补偿的云控原型，负责参数输入、推荐展示、设备状态和结果回采等关键界面。',
      en: 'A cloud-control prototype for pipe rebound compensation, covering input, recommendations, equipment status, and result feedback.',
    },
    highlights: {
      zh: ['输入更清楚', '设备状态可见', '结果可回看'],
      en: ['Clear input flow', 'Visible equipment status', 'Reviewable results'],
    },
  },
  'thermal-comfort': {
    short: {
      zh: '用 Python 和神经网络做热舒适预测练习。',
      en: 'A Python and neural-network exercise for thermal comfort prediction.',
    },
  },
  'photography-site': {
    short: {
      zh: '一个放摄影作品和生活观察的长期作品集。',
      en: 'A long-term gallery for photography and everyday observation.',
    },
  },
  bofan: {
    short: {
      zh: '这座网站本身：项目、文章、代码和摄影的集合。',
      en: 'This site itself: projects, writing, code, and photography in one place.',
    },
  },
  'leetcode-notes': {
    short: {
      zh: '记录刷题思路和代码表达的学习笔记。',
      en: 'Learning notes for algorithm ideas and code expression.',
    },
  },
}

export const homeExperienceCopy: Record<string, { description: LocalizedText }> = {
  'rebound-cloud-control': {
    description: {
      zh: '负责前端界面和数据流程，把工程需求整理成能演示、能操作的原型。',
      en: 'Built the interface and data flow, turning engineering needs into a usable prototype.',
    },
  },
  'new-media-center': {
    description: {
      zh: '参与校园新媒体内容，继续练习摄影、剪辑和视觉表达。',
      en: 'Worked on campus media content while practicing photography, editing, and visual storytelling.',
    },
  },
  'ai-course': {
    description: {
      zh: '系统学习 Python、AI 基础和神经网络，并尝试做热舒适预测项目。',
      en: 'Studied Python, AI fundamentals, and neural networks, then tried a thermal comfort project.',
    },
  },
  'ventilation-research': {
    description: {
      zh: '参与通风流场与炮烟消散研究，积累工程建模和分析经验。',
      en: 'Joined ventilation flow and fume dispersion research, gaining modeling and analysis practice.',
    },
  },
}

export const homeHonorCopy: Record<string, { description: LocalizedText }> = {
  cet4: {
    description: {
      zh: '能阅读英文资料，也在继续提升技术写作表达。',
      en: 'A base for reading English materials and improving technical writing.',
    },
  },
  reboundcc: {
    description: {
      zh: '回弹智控相关系统的软件成果之一。',
      en: 'One software result from the Rebound intelligent control work.',
    },
  },
  'league-member': {
    description: {
      zh: '来自学习、集体参与和日常表现的阶段性认可。',
      en: 'A recognition of study, campus participation, and everyday effort.',
    },
  },
}

export const homeUpdateCopy: Record<string, { content: LocalizedText }> = {
  site: {
    content: {
      zh: '开始整理个人网站，把项目、文章、代码记录和摄影放到一个长期更新的地方。',
      en: 'Started organizing this personal site for projects, notes, code, and photography.',
    },
  },
  rebound: {
    content: {
      zh: '继续推进 Rebound Cloud Control 原型，重点做前端界面和数据流程。',
      en: 'Kept building the Rebound Cloud Control prototype, focusing on interface and data flow.',
    },
  },
  ai: {
    content: {
      zh: '学习 Python AI 编程，尝试和建筑环境、能源工程问题结合。',
      en: 'Studied Python AI programming and connected it with building energy questions.',
    },
  },
  media: {
    content: {
      zh: '参与新媒体中心工作，练习摄影、剪辑和内容表达。',
      en: 'Worked with the New Media Center, practicing photography, editing, and content expression.',
    },
  },
  leetcode: {
    content: {
      zh: '开始整理 LeetCode 笔记，记录算法思路和代码写法。',
      en: 'Started LeetCode notes to record algorithm ideas and code patterns.',
    },
  },
}

export const codeCopy: Record<
  Locale,
  {
    slogan: string
    recentHeading: string
    error: string
    repoFallback: string
    status: {
      loading: string
      error: string
      ready: string
    }
    statLabels: {
      repos: string
      stars: string
      language: string
      forks: string
      followers: string
    }
  }
> = {
  zh: {
    slogan: '多写一点，多学一点。',
    recentHeading: '最近更新',
    error: '暂时读不到 GitHub 数据，你仍可以打开我的主页。',
    repoFallback: '暂无描述',
    status: {
      loading: '正在读取 GitHub',
      error: 'GitHub 主页',
      ready: '公开 GitHub 数据',
    },
    statLabels: {
      repos: '公开仓库',
      stars: 'Stars',
      language: '主力语言',
      forks: 'Forks',
      followers: '关注者',
    },
  },
  en: {
    slogan: 'Write more. Learn more.',
    recentHeading: 'Recent updates',
    error: 'GitHub data is unavailable for now. My profile link still works.',
    repoFallback: 'No description yet',
    status: {
      loading: 'Loading GitHub',
      error: 'GitHub profile',
      ready: 'Public GitHub data',
    },
    statLabels: {
      repos: 'Repos',
      stars: 'Stars',
      language: 'Main language',
      forks: 'Forks',
      followers: 'Followers',
    },
  },
}
