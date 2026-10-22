export type JourneyLocale = 'en' | 'vi';

export interface JourneyAssignment {
  period: string;
  name: string;
  description: string;
}

export interface JourneyMilestone {
  id: string;
  period: string;
  year: string;
  kind: 'career' | 'open-source';
  current?: boolean;
  company: string;
  role: string;
  summary: string;
  assignments: JourneyAssignment[];
  technologies: string[];
  links?: { name: string; href: string }[];
}

// Employment dates come from the public-facing CV history.
// Client assignments are deliberately nested under the legal employer, not shown as employers.
// Open-source is a separate milestone, not a paid role.
export const journeyMilestones: Record<JourneyLocale, JourneyMilestone[]> = {
  en: [
    {
      id: 'mgi', year: '2019', period: 'JUN 2019 — DEC 2021', kind: 'career',
      company: 'MGI Global', role: 'Mobile Developer',
      summary: 'Started building production mobile experiences for real-estate teams, learning how mobile products support complex day-to-day workflows.',
      assignments: [
        {period:'2019–2021',name:'MGI Agents',description:'Property discovery and agent workflows.'},
        {period:'2021',name:'MGI Star Club',description:'Rewards and team engagement experiences.'},
        {period:'2021',name:'MGI RealtorX',description:'Tools for real-estate professionals.'}
      ],
      technologies: ['Mobile Development', 'React Native', 'Product Delivery'],
    },
    {
      id: '45cm', year: '2022', period: 'JAN 2022 — FEB 2023', kind: 'career',
      company: '45CM VINA CO., LTD', role: 'Mobile Developer',
      summary: 'Continued shipping and maintaining mobile applications, with a stronger focus on reusable UI, feature ownership, and delivery quality.',
      assignments: [{period:'2022–2023',name:'45CM',description:'Mobile application engineering and product iteration.'}],
      technologies: ['Mobile Development', 'UI Engineering', 'Cross-platform'],
    },
    {
      id: '1988s', year: '2023', period: 'MAR 2023 — AUG 2024', kind: 'career',
      company: '1988s Media and Technology', role: 'Mobile Developer',
      summary: 'Built product experiences across mobile and web, including the NORI food-service ecosystem and internal workflow tools.',
      assignments: [
        {period:'2023–2024',name:'NORI Food / NORI Staff',description:'Customer and operations-facing application workflows.'},
        {period:'2023',name:'Task Manager',description:'Internal task and workflow management.'},
        {period:'2023–2024',name:'norifood.vn',description:'Complementary web experiences for the NORI ecosystem.'},
      ],
      technologies: ['React Native', 'React', 'TypeScript'],
    },
    {
      id: 'galaxy', year: '2025', period: 'FEB 2025 — PRESENT', kind: 'career', current: true,
      company: 'Galaxy Technology Services', role: 'Mobile Developer',
      summary: 'I currently work at Galaxy Technology Services as a Mobile Developer. HDBank and VietJet Air were client assignments through Galaxy; the HDBank assignment ended in July 2026, but my employment with Galaxy continues.',
      assignments: [
        {period:'FEB — JUN 2025',name:'DI HDBank',description:'React Native banking experience and CMS-driven mobile screens.'},
        {period:'JUN — NOV 2025',name:'VietJet Air',description:'Mobile development and migration work from React Native to Flutter.'},
        {period:'NOV 2025 — JUL 2026',name:'HDBank',description:'React Native money-transfer and transaction flows, independent delivery, and cross-team collaboration.'}
      ],
      technologies: ['React Native', 'Flutter', 'iOS / Android', 'Fintech'],
    },
    {
      id: 'open-source', year: '2026', period: '2026 / INDEPENDENT WORK', kind: 'open-source',
      company: 'Building in the open', role: 'Open-source projects · separate from employment',
      summary: 'Alongside my ongoing role at Galaxy Technology Services, I build open-source tools in my personal time—sharing practical lessons from mobile engineering and AI-assisted development.',
      assignments: [
        {period:'CODE INTELLIGENCE',name:'Code Atlas',description:'Local-first repository graph, symbol navigation, and impact analysis.'},
        {period:'AI INFRASTRUCTURE',name:'Showdar Router',description:'Model routing, provider fallback, and local developer workflows.'},
        {period:'AGENT WORKFLOWS',name:'Showdar Skills',description:'Composable engineering skills for coding agents.'}
      ],
      technologies: ['TypeScript', 'MCP', 'CLI', 'Open Source'],
      links: [
        {name:'Code Atlas',href:'/projects/code-atlas/'},
        {name:'Showdar Router',href:'/projects/showdar-router/'},
        {name:'Showdar Skills',href:'/projects/showdar-skills/'}
      ]
    }
  ],
  vi: [
    {
      id: 'mgi', year: '2019', period: '06/2019 — 12/2021', kind: 'career',
      company: 'MGI Global', role: 'Mobile Developer',
      summary: 'Bắt đầu phát triển ứng dụng mobile thực tế cho đội ngũ bất động sản, làm quen với những quy trình nghiệp vụ phức tạp và nhu cầu sử dụng hằng ngày.',
      assignments: [
        {period:'2019–2021',name:'MGI Agents',description:'Tìm kiếm bất động sản và quy trình làm việc của môi giới.'},
        {period:'2021',name:'MGI Star Club',description:'Trải nghiệm phần thưởng và hoạt động đội nhóm.'},
        {period:'2021',name:'MGI RealtorX',description:'Công cụ hỗ trợ chuyên viên bất động sản.'}
      ],
      technologies: ['Mobile Development', 'React Native', 'Product Delivery'],
    },
    {
      id: '45cm', year: '2022', period: '01/2022 — 02/2023', kind: 'career',
      company: '45CM VINA CO., LTD', role: 'Mobile Developer',
      summary: 'Tiếp tục phát triển và bảo trì ứng dụng mobile, tập trung hơn vào UI tái sử dụng, chủ động triển khai tính năng và chất lượng bàn giao.',
      assignments: [{period:'2022–2023',name:'45CM',description:'Phát triển ứng dụng mobile và cải tiến sản phẩm.'}],
      technologies: ['Mobile Development', 'UI Engineering', 'Cross-platform'],
    },
    {
      id: '1988s', year: '2023', period: '03/2023 — 08/2024', kind: 'career',
      company: '1988s Media and Technology', role: 'Mobile Developer',
      summary: 'Phát triển sản phẩm trên mobile và web, trong đó có hệ sinh thái NORI và công cụ hỗ trợ vận hành nội bộ.',
      assignments: [
        {period:'2023–2024',name:'NORI Food / NORI Staff',description:'Các luồng ứng dụng dành cho khách hàng và vận hành.'},
        {period:'2023',name:'Task Manager',description:'Quản lý công việc và quy trình nội bộ.'},
        {period:'2023–2024',name:'norifood.vn',description:'Trải nghiệm web hỗ trợ hệ sinh thái NORI.'},
      ],
      technologies: ['React Native', 'React', 'TypeScript'],
    },
    {
      id: 'galaxy', year: '2025', period: '02/2025 — HIỆN TẠI', kind: 'career', current: true,
      company: 'Galaxy Technology Services', role: 'Mobile Developer',
      summary: 'Hiện mình vẫn đang làm việc tại Galaxy Technology Services với vai trò Mobile Developer. HDBank và VietJet Air là các dự án khách hàng; việc kết thúc dự án HDBank vào 07/2026 không có nghĩa là mình nghỉ Galaxy.',
      assignments: [
        {period:'02 — 06/2025',name:'DI HDBank',description:'Phát triển React Native banking và các màn hình mobile theo CMS.'},
        {period:'06 — 11/2025',name:'VietJet Air',description:'Phát triển mobile và tham gia chuyển đổi React Native sang Flutter.'},
        {period:'11/2025 — 07/2026',name:'HDBank',description:'Phụ trách luồng chuyển tiền, giao dịch React Native và phối hợp liên nhóm.'}
      ],
      technologies: ['React Native', 'Flutter', 'iOS / Android', 'Fintech'],
    },
    {
      id: 'open-source', year: '2026', period: '2026 / DỰ ÁN CÁ NHÂN', kind: 'open-source',
      company: 'Xây dựng mã nguồn mở', role: 'Dự án cá nhân · không phải kinh nghiệm tuyển dụng',
      summary: 'Song song với công việc hiện tại tại Galaxy Technology Services, mình phát triển các công cụ mã nguồn mở cá nhân, ứng dụng kinh nghiệm mobile và AI-assisted development.',
      assignments: [
        {period:'PHÂN TÍCH CODE',name:'Code Atlas',description:'Graph repository chạy cục bộ, điều hướng symbol và phân tích ảnh hưởng thay đổi.'},
        {period:'HẠ TẦNG AI',name:'Showdar Router',description:'Định tuyến model, fallback provider và quy trình phát triển local.'},
        {period:'QUY TRÌNH AGENT',name:'Showdar Skills',description:'Bộ engineering skill kết hợp cho coding agent.'}
      ],
      technologies: ['TypeScript', 'MCP', 'CLI', 'Open Source'],
      links: [
        {name:'Code Atlas',href:'/projects/code-atlas/'},
        {name:'Showdar Router',href:'/projects/showdar-router/'},
        {name:'Showdar Skills',href:'/projects/showdar-skills/'}
      ]
    }
  ]
};

export const journeyCopy = {
  en: {
    breadcrumb:'Home', eyebrow:'THE ROAD SO FAR / 2019 — PRESENT',
    heading:'A career built', emphasis:'one problem at a time.',
    intro:'I am currently a Mobile Developer at Galaxy Technology Services. This timeline covers my earlier roles, client assignments, and open-source projects built alongside my full-time work.',
    smallLabel:'CAREER JOURNEY', snapshotLabel:'AT A GLANCE', snapshotValue:'2019 — PRESENT',
    currentRole:'CURRENTLY EMPLOYED', currentCompany:'Galaxy Technology Services · Mobile Developer',
    snapshotSub:'Mobile products · cross-platform engineering · open source',
    viewGithub:'Explore open-source work', viewLinkedin:'LinkedIn profile',
    scrollCue:'SCROLL TO EXPLORE', sectionTitle:'Milestones, not job titles.',
    sectionSubtitle:'Currently employed at Galaxy Technology Services (February 2025–present). Earlier client assignments and personal open-source projects are shown separately.',
    chapter:'CHAPTER', assignments:'SELECTED PROJECTS & ASSIGNMENTS', openSource:'INDEPENDENT WORK',
    career:'EMPLOYMENT', next:'Continue exploring', nextIntro:'See the projects behind the journey.',
    viewProjects:'Browse all projects', backHome:'Back to home',
    summaryLink:'Explore full career journey',
    homepagePrompt:'FROM EXPERIENCE TO EXPERIMENTS', homepageIntro:'Explore the path from production mobile apps to open-source tools.',
    title:'Career Journey — Leo',
    description:'Career journey of Leo (Cao Ngoc Quy), currently a Mobile Developer at Galaxy Technology Services since February 2025, with past roles and independent open-source projects.'
  },
  vi: {
    breadcrumb:'Trang chủ', eyebrow:'HÀNH TRÌNH / 2019 — HIỆN TẠI',
    heading:'Từng chặng đường,', emphasis:'từng bài toán mới.',
    intro:'Mình hiện đang làm Mobile Developer tại Galaxy Technology Services. Đây là hành trình qua những công ty trước đây, các dự án khách hàng và sản phẩm mã nguồn mở mình phát triển song song với công việc.',
    smallLabel:'HÀNH TRÌNH SỰ NGHIỆP', snapshotLabel:'TỔNG QUAN', snapshotValue:'2019 — HIỆN TẠI',
    currentRole:'ĐANG LÀM VIỆC', currentCompany:'Galaxy Technology Services · Mobile Developer',
    snapshotSub:'Sản phẩm mobile · kỹ thuật đa nền tảng · mã nguồn mở',
    viewGithub:'Khám phá mã nguồn mở', viewLinkedin:'Hồ sơ LinkedIn',
    scrollCue:'CUỘN ĐỂ KHÁM PHÁ', sectionTitle:'Những cột mốc thực tế.',
    sectionSubtitle:'Mình vẫn đang làm tại Galaxy Technology Services (02/2025–hiện tại). Các dự án khách hàng đã kết thúc và dự án cá nhân được trình bày riêng.',
    chapter:'CHẶNG', assignments:'DỰ ÁN & CÔNG VIỆC TIÊU BIỂU', openSource:'DỰ ÁN CÁ NHÂN',
    career:'KINH NGHIỆM LÀM VIỆC', next:'Tiếp tục khám phá', nextIntro:'Khám phá các dự án đằng sau hành trình này.',
    viewProjects:'Xem tất cả dự án', backHome:'Về trang chủ',
    summaryLink:'Khám phá hành trình nghề nghiệp',
    homepagePrompt:'TỪ SẢN PHẨM THỰC TẾ ĐẾN MÃ NGUỒN MỞ',
    homepageIntro:'Những bước phát triển từ ứng dụng mobile đến công cụ dành cho developer.',
    title:'Hành trình sự nghiệp — Leo',
    description:'Hành trình nghề nghiệp của Leo (Cao Ngọc Quý), hiện là Mobile Developer tại Galaxy Technology Services từ 02/2025, cùng các dự án mã nguồn mở cá nhân.'
  }
} as const;
