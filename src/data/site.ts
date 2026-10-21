export const site = {
  name: 'Leo',
  fullName: 'Cao Ngoc Quy',
  role: 'Mobile Engineer & Open-source Builder',
  github: 'https://github.com/caongocquy',
  githubRepositories: 'https://github.com/caongocquy?tab=repositories',
  description: 'Leo is a mobile engineer building thoughtful mobile experiences and open-source tools for developers.',
} as const;

export const expertise = [
  {
    number: '01',
    icon: 'mobile',
    title: 'Mobile engineering',
    description: 'Production-grade React Native applications, platform integration, and thoughtful cross-platform interfaces.',
    tags: ['React Native', 'Flutter', 'iOS / Android'],
  },
  {
    number: '02',
    icon: 'layers',
    title: 'Architecture & performance',
    description: 'Readable boundaries, predictable state, measurable performance, and reliable mobile workflows.',
    tags: ['TypeScript', 'Architecture', 'Performance'],
  },
  {
    number: '03',
    icon: 'terminal',
    title: 'Developer experience',
    description: 'Small libraries and ambitious tools that remove friction from how other developers build software.',
    tags: ['Open Source', 'CLI', 'AI tooling'],
  },
] as const;

export const stack = [
  'React Native', 'TypeScript', 'Flutter', 'Dart', 'Swift', 'Kotlin',
  'Mobile Architecture', 'Performance', 'Node.js', 'MCP',
] as const;
