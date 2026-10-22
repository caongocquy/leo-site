import type { CollectionEntry } from 'astro:content';

export type Locale = 'en' | 'vi';
// Vietnamese is canonical at /; English uses /en/.
export const localeFromPath = (path: string): Locale => path === '/en' || path.startsWith('/en/') ? 'en' : 'vi';

export const localizedPath = (path: string, locale: Locale): string => {
  const normalized = path.replace(/^\/(?:vi|en)(?=\/|$)/, '') || '/';
  return locale === 'en' ? `/en${normalized}` : normalized;
};

const en = {
  navExpertise: 'Expertise', navExperience: 'Experience', navProjects: 'Projects', navAbout: 'About Me',
  githubProfile: 'GitHub profile', skip: 'Skip to content',
  hello: "HELLO, I'M LEO", occupation: 'MOBILE ENGINEER',
  heroTitle: 'Building mobile products.', heroEmphasis: 'Engineering developer tools', heroEnd: '',
  heroDescription: 'I build production mobile experiences and open-source tools that help developers understand and improve code. From React Native to code intelligence and AI-assisted workflows, I focus on practical engineering.',
  heroJourney: 'Career journey',
  exploreWork: 'Explore projects', mobileNative: 'React Native & native', mobileArchitecture: 'Mobile architecture', openSource: 'Open source',
  whatIDo: '02 / WHAT I DO', expertiseTitle: 'Engineering beyond', expertiseTitleEm: 'the screen.',
  expertiseIntro: 'I think about the whole experience: what users see, what platforms need, and what makes software sustainable.',
  expertise1Title: 'Mobile engineering', expertise1Desc: 'Production-grade React Native applications, platform integration, and thoughtful cross-platform interfaces.',
  expertise2Title: 'Architecture & performance', expertise2Desc: 'Readable boundaries, predictable state, measurable performance, and reliable mobile workflows.',
  expertise3Title: 'Developer experience', expertise3Desc: 'Small libraries and ambitious tools that remove friction from how other developers build software.',
  experienceLabel: '03 / EXPERIENCE', experienceTitle: 'Real products.', experienceEm: 'Real constraints.',
  experienceIntro: 'The work that shapes my approach to building reliable, user-friendly software.',
  experience1Label: 'PRODUCTION ENGINEERING', experience1Title: 'Mobile experiences in fintech',
  experience1Desc: 'Building and owning complex React Native workflows in cross-functional environments, from feature delivery to integration and reliability issues.',
  experience2Label: 'PLATFORM & NATIVE', experience2Title: 'Across iOS and Android',
  experience2Desc: 'Working at the JavaScript–native boundary to refine transitions, integrate platform capabilities, and deliver maintainable mobile UI.',
  selectedWork: '04 / SELECTED WORK', projectsTitle: 'Open source,', projectsEm: 'built with purpose.',
  projectsIntro: 'Useful experiments and products I build, refine, and share with other developers.',
  viewAllProjects: 'View all projects', featuredProject: 'FEATURED PROJECT / CODE INTELLIGENCE',
  exploreAtlas: 'Explore Code Atlas', aboutLabel: '04 / ABOUT ME',
  aboutTitle: 'Mobile by craft.', aboutTitleEm: 'Builder by curiosity.',
  aboutText: "I'm Leo, a mobile engineer who enjoys solving the hard parts—architecture, native integrations, performance, and developer experience. My open-source projects are where I turn those lessons into tools other developers can use.",
  connectGithub: 'Connect on GitHub', toolbox: 'MY TOOLBOX', alwaysLearning: 'Always learning. Always building.',
  ctaPrompt: 'HAVE SOMETHING IN MIND?', ctaTitle: "Let's build something", ctaEm: 'meaningful.', findGithub: 'Find me on GitHub',
  engineeredForMobile: 'ENGINEERED FOR MOBILE', verification: 'SECURE VERIFICATION',
  enterCode: 'Enter your code.', codeHint: 'We sent a 6-digit verification code to your phone.',
  resend: 'Resend in', continue: 'Continue', realComponent: 'REAL COMPONENT · OPEN SOURCE',
  home: 'About Me', projectsEyebrow: 'OPEN SOURCE / SELECTED PROJECTS',
  projectsPageTitle: 'Building in', projectsPageEm: 'the open.',
  projectsPageIntro: 'Tools and libraries I make to solve practical engineering problems. Everything here links to source code you can explore.',
  devTools: '01 / DEVELOPER TOOLS', devToolsTitle: 'Code & AI tooling',
  mobilePackages: '02 / MOBILE LIBRARIES', mobilePackagesTitle: 'React Native packages', countProjects: 'PROJECTS',
  categoryTools: 'AI & Developer Tools', categoryMobile: 'React Native',
  viewProject: 'View project', projectDetailsLabel: 'View project details', allProjects: 'All projects',
  sourceGithub: 'View source on GitHub', npmPackage: 'npm package',
  technology: 'TECHNOLOGIES', builtOpen: 'Built in the open · Explore the code',
  highlights: 'KEY HIGHLIGHTS', repository: 'Repository', moreExplore: 'More to explore', seeAll: 'See all projects',
  detailOpenSource: 'OPEN SOURCE', footerTagline: 'Built with care. Shared in the open.',
  terminalEyebrow: 'INTERACTIVE WALKTHROUGH', terminalTitle: 'Start with a command',
  terminalIntroA: 'Explore the setup flow for', terminalIntroB: 'This is a visual guide—no commands are executed.',
  terminalQuick: 'CLI / QUICK START', terminalGuided: 'GUIDED PREVIEW',
  terminalInstallWith: 'INSTALL WITH', terminalReadme: '# Follow the README for full setup and platform requirements.',
  terminalReady: 'Commands ready to copy', terminalTyping: 'Typing example commands…',
  terminalNoRun: 'NO COMMANDS EXECUTED', replay: 'Replay', copyCommands: 'Copy commands',
  copied: 'Copied!', featurePreview: 'Feature preview', whatItDoes: 'WHAT IT DOES',
  viewActualSource: 'View actual source', terminalAccessible: 'No commands are run by this demo.',
  copySuccess: 'Commands copied to clipboard.', copyFailed: 'Clipboard unavailable. Select the commands to copy them.',
  galleryEyebrow: 'REAL PROJECT ARTIFACTS', galleryTitle: 'See it in action',
  galleryExpand: 'CLICK TO EXPAND', galleryActual: 'Actual images from the public project repository',
  galleryConcept: 'Promotional concept illustration (not an actual app screenshot)',
  galleryClose: 'Close image viewer', galleryPrevious: 'Previous screenshot', galleryNext: 'Next screenshot',
  notFoundTitle: 'Wrong turn', notFoundIntro: "Looks like this page took a different path. Let's get you back to the good stuff.",
  notFoundLabel: '404 / PAGE NOT FOUND', backHome: 'Back to home',
  switchEnglish: 'English', switchVietnamese: 'Tiếng Việt',
  siteDescription: "I'm Leo, a Mobile Engineer. I build mobile apps and open-source tools that help developers understand and improve code.",
  projectsDescription: 'Open-source projects and developer tools built by Leo, from code intelligence to reusable React Native libraries.',
  notFoundDescription: 'The page you requested could not be found.',
  screenVerification: 'ACCOUNT VERIFICATION',
  role: 'Mobile Engineer & Open Source Builder',
} as const;

const vi: Record<keyof typeof en, string> = {
  navExpertise: 'Chuyên môn', navExperience: 'Kinh nghiệm', navProjects: 'Dự án', navAbout: 'Giới thiệu',
  githubProfile: 'Trang GitHub', skip: 'Bỏ qua đến nội dung',
  hello: 'XIN CHÀO, MÌNH LÀ LEO', occupation: 'KỸ SƯ MOBILE',
  heroTitle: 'Xây dựng ứng dụng mobile.', heroEmphasis: 'Phát triển công cụ cho developer', heroEnd: '',
  heroDescription: 'Mình phát triển ứng dụng mobile thực tế và các công cụ mã nguồn mở giúp developer hiểu, cải thiện và bảo trì code. Từ React Native đến code intelligence và quy trình phát triển cùng AI agent.',
  heroJourney: 'Hành trình nghề nghiệp',
  exploreWork: 'Khám phá dự án', mobileNative: 'React Native & native', mobileArchitecture: 'Kiến trúc mobile', openSource: 'Mã nguồn mở',
  whatIDo: '02 / CHUYÊN MÔN', expertiseTitle: 'Không chỉ là', expertiseTitleEm: 'giao diện.',
  expertiseIntro: 'Mình quan tâm đến toàn bộ sản phẩm: trải nghiệm người dùng, đặc thù nền tảng và khả năng bảo trì lâu dài.',
  expertise1Title: 'Phát triển mobile', expertise1Desc: 'Ứng dụng React Native thực tế, tích hợp nền tảng và giao diện đa nền tảng được chăm chút.',
  expertise2Title: 'Kiến trúc & hiệu năng', expertise2Desc: 'Phân tách trách nhiệm rõ ràng, state dễ dự đoán, hiệu năng đo lường được và luồng xử lý ổn định.',
  expertise3Title: 'Công cụ cho developer', expertise3Desc: 'Thư viện và công cụ giảm thao tác lặp lại, cải thiện trải nghiệm phát triển phần mềm.',
  experienceLabel: '03 / KINH NGHIỆM', experienceTitle: 'Sản phẩm thực tế.', experienceEm: 'Thách thức thực tế.',
  experienceIntro: 'Những bài toán đã định hình cách mình xây dựng phần mềm ổn định và dễ sử dụng.',
  experience1Label: 'SẢN PHẨM PRODUCTION', experience1Title: 'Ứng dụng mobile trong tài chính',
  experience1Desc: 'Phụ trách các luồng React Native phức tạp, phối hợp đa nhóm từ triển khai tính năng, tích hợp đến xử lý sự cố và độ ổn định.',
  experience2Label: 'NATIVE & NỀN TẢNG', experience2Title: 'Đa nền tảng iOS và Android',
  experience2Desc: 'Làm việc ở ranh giới JavaScript–native, tối ưu chuyển cảnh, tích hợp tính năng nền tảng và xây dựng UI dễ bảo trì.',
  selectedWork: '04 / DỰ ÁN TIÊU BIỂU', projectsTitle: 'Mã nguồn mở,', projectsEm: 'giá trị thực tiễn.',
  projectsIntro: 'Những sản phẩm và công cụ mình xây dựng, cải tiến và chia sẻ cùng cộng đồng lập trình viên.',
  viewAllProjects: 'Xem tất cả dự án', featuredProject: 'DỰ ÁN NỔI BẬT / PHÂN TÍCH CODE',
  exploreAtlas: 'Khám phá Code Atlas', aboutLabel: '04 / GIỚI THIỆU',
  aboutTitle: 'Mobile là chuyên môn.', aboutTitleEm: 'Sáng tạo là động lực.',
  aboutText: 'Mình là Leo, kỹ sư mobile yêu thích việc giải quyết các bài toán khó về kiến trúc, tích hợp native, hiệu năng và trải nghiệm developer. Các dự án mã nguồn mở là nơi mình biến kinh nghiệm thực tế thành công cụ hữu ích cho cộng đồng.',
  connectGithub: 'Kết nối qua GitHub', toolbox: 'CÔNG NGHỆ SỬ DỤNG', alwaysLearning: 'Không ngừng học hỏi và xây dựng.',
  ctaPrompt: 'CÓ Ý TƯỞNG MUỐN TRIỂN KHAI?', ctaTitle: 'Cùng tạo nên một sản phẩm', ctaEm: 'có giá trị.', findGithub: 'Xem GitHub của mình',
  engineeredForMobile: 'THIẾT KẾ CHO MOBILE', verification: 'XÁC MINH AN TOÀN',
  enterCode: 'Nhập mã xác minh.', codeHint: 'Mã xác minh 6 chữ số đã được gửi đến điện thoại.',
  resend: 'Gửi lại sau', continue: 'Tiếp tục', realComponent: 'THƯ VIỆN THỰC TẾ · MÃ NGUỒN MỞ',
  home: 'Giới thiệu', projectsEyebrow: 'MÃ NGUỒN MỞ / DỰ ÁN TIÊU BIỂU',
  projectsPageTitle: 'Cùng xây dựng', projectsPageEm: 'mã nguồn mở.',
  projectsPageIntro: 'Các thư viện và công cụ giải quyết bài toán kỹ thuật thực tiễn. Mỗi dự án đều có mã nguồn để khám phá.',
  devTools: '01 / CÔNG CỤ DEVELOPER', devToolsTitle: 'Công cụ AI & lập trình',
  mobilePackages: '02 / THƯ VIỆN MOBILE', mobilePackagesTitle: 'Thư viện React Native', countProjects: 'DỰ ÁN',
  categoryTools: 'AI & Công cụ developer', categoryMobile: 'React Native',
  viewProject: 'Xem dự án', projectDetailsLabel: 'Xem chi tiết dự án', allProjects: 'Tất cả dự án',
  sourceGithub: 'Xem mã nguồn trên GitHub', npmPackage: 'Gói npm',
  technology: 'CÔNG NGHỆ', builtOpen: 'Mã nguồn mở · Khám phá mã nguồn',
  highlights: 'ĐIỂM NỔI BẬT', repository: 'Kho mã nguồn', moreExplore: 'Khám phá thêm', seeAll: 'Xem tất cả dự án',
  detailOpenSource: 'MÃ NGUỒN MỞ', footerTagline: 'Xây dựng bằng tâm huyết. Chia sẻ cùng cộng đồng.',
  terminalEyebrow: 'HƯỚNG DẪN TƯƠNG TÁC', terminalTitle: 'Bắt đầu từ dòng lệnh',
  terminalIntroA: 'Tham khảo cách cài đặt', terminalIntroB: 'Đây là bản minh họa — không có lệnh nào được thực thi.',
  terminalQuick: 'CLI / BẮT ĐẦU NHANH', terminalGuided: 'BẢN XEM THỬ',
  terminalInstallWith: 'CÀI BẰNG', terminalReadme: '# Đọc README để biết đầy đủ yêu cầu cài đặt và nền tảng.',
  terminalReady: 'Lệnh đã sẵn sàng để sao chép', terminalTyping: 'Đang nhập lệnh mẫu…',
  terminalNoRun: 'KHÔNG THỰC THI LỆNH', replay: 'Phát lại', copyCommands: 'Sao chép lệnh',
  copied: 'Đã sao chép!', featurePreview: 'Xem tính năng', whatItDoes: 'CHỨC NĂNG',
  viewActualSource: 'Xem mã nguồn thực tế', terminalAccessible: 'Bản minh họa không thực thi lệnh.',
  copySuccess: 'Đã sao chép các lệnh.', copyFailed: 'Không thể truy cập clipboard. Hãy chọn và sao chép thủ công.',
  galleryEyebrow: 'HÌNH ẢNH DỰ ÁN', galleryTitle: 'Xem trực quan',
  galleryExpand: 'NHẤN ĐỂ PHÓNG TO', galleryActual: 'Hình ảnh thực từ kho mã nguồn công khai',
  galleryConcept: 'Hình minh họa quảng bá (không phải ảnh chụp ứng dụng thực tế)',
  galleryClose: 'Đóng trình xem ảnh', galleryPrevious: 'Ảnh trước', galleryNext: 'Ảnh tiếp theo',
  notFoundTitle: 'Không tìm thấy trang', notFoundIntro: 'Đường dẫn này không còn tồn tại. Hãy quay về trang chủ nhé.',
  notFoundLabel: '404 / KHÔNG TÌM THẤY TRANG', backHome: 'Về trang chủ',
  switchEnglish: 'English', switchVietnamese: 'Tiếng Việt',
  siteDescription: 'Mình là Leo, một Mobile Engineer. Mình xây dựng ứng dụng mobile và các công cụ mã nguồn mở giúp developer hiểu và cải thiện code.',
  projectsDescription: 'Các dự án mã nguồn mở và công cụ phát triển của Leo, từ phân tích code đến thư viện React Native.',
  notFoundDescription: 'Không tìm thấy trang yêu cầu.',
  screenVerification: 'XÁC MINH TÀI KHOẢN',
  role: 'Mobile Engineer & Open Source Builder',
};

export const ui = (locale: Locale) => locale === 'vi' ? vi : en;

interface ProjectTranslation {
  subtitle: string;
  summary: string;
  highlights: string[];
  sections: { heading: string; paragraphs: string[] }[];
}
const projectsVi: Record<string, ProjectTranslation> = {
  'code-atlas': {
    subtitle: 'Phân tích cấu trúc kho mã nguồn cho coding agent',
    summary: 'Công cụ phân tích mã nguồn local-first, ánh xạ symbol, lời gọi hàm, dependency và phạm vi ảnh hưởng của thay đổi thành ngữ cảnh có cấu trúc cho coding agent.',
    highlights: ['Lập chỉ mục từ vựng và đồ thị mã nguồn chạy cục bộ', 'Khám phá symbol, call graph và phạm vi ảnh hưởng', 'Tích hợp CLI và Model Context Protocol'],
    sections: [
      { heading: 'Vì sao mình xây dựng?', paragraphs: ['Coding agent làm việc hiệu quả hơn khi hiểu cấu trúc codebase trước khi sửa. Code Atlas giúp cung cấp symbol, dependency, luồng thực thi và phạm vi ảnh hưởng mà không cần dịch vụ lưu trữ bên ngoài.'] },
      { heading: 'Cách hoạt động', paragraphs: ['Công cụ tạo biểu diễn cấu trúc của repository ngay trên máy và cung cấp các chức năng thông qua CLI và MCP. Agent có thể truy vấn quan hệ giữa các thành phần để lấy đúng ngữ cảnh cho công việc.'] },
      { heading: 'Bắt đầu', paragraphs: ['Tham khảo các lệnh trong terminal phía trên, chạy tại thư mục phù hợp và đọc README của dự án để biết yêu cầu, cách tích hợp và thông tin triển khai.'] },
    ],
  },
  'showdar-router': {
    subtitle: 'Định tuyến và fallback cho AI model',
    summary: 'Cổng kết nối AI local-first giúp định tuyến nhiều provider, chuyển sang model dự phòng theo thứ tự và thống nhất endpoint API.',
    highlights: ['Định tuyến yêu cầu giữa nhiều model/provider', 'Fallback có thứ tự khi provider gặp lỗi', 'Một điểm truy cập API cho các công cụ coding agent'],
    sections: [
      { heading: 'Vì sao mình xây dựng?', paragraphs: ['Làm việc với nhiều nhà cung cấp AI dễ phát sinh cấu hình rời rạc và sự cố hết quota, giới hạn tốc độ hoặc kết nối. Showdar Router gom quá trình định tuyến và dự phòng về một nơi.'] },
      { heading: 'Cách hoạt động', paragraphs: ['Router nhận yêu cầu qua endpoint tương thích, chọn provider/model theo cấu hình và xử lý fallback khi điều kiện cho phép. Mục tiêu là giảm gián đoạn trong quy trình dùng agent.'] },
      { heading: 'Bắt đầu', paragraphs: ['Tham khảo các lệnh mẫu phía trên và làm theo README để cấu hình provider, thông tin truy cập và chính sách fallback.'] },
    ],
  },
  'showdar-skills': {
    subtitle: 'Quy trình kỹ thuật thực tế cho AI coding agent',
    summary: 'Bộ skill có thể kết hợp cho coding agent, sử dụng định tuyến theo mục đích và nạp ngữ cảnh dần cho các tác vụ phát triển phần mềm.',
    highlights: ['Định tuyến skill theo tác vụ và nạp ngữ cảnh dần', 'Quy trình tái sử dụng cho lập kế hoạch, phát triển, debug, test và review', 'Hỗ trợ Cursor, Claude Code, OpenCode và Codex'],
    sections: [
      { heading: 'Vì sao mình xây dựng?', paragraphs: ['Coding agent cần quy trình kỹ thuật nhất quán hơn những lời nhắc chung. Showdar Skills đóng gói các thực hành phát triển phần mềm thành skill có thể lắp ghép và cài đặt mà không phải tải tất cả hướng dẫn cùng lúc.'] },
      { heading: 'Cách hoạt động', paragraphs: ['Bộ công cụ cung cấp setup tương tác, định tuyến dựa trên tác vụ và các skill cho những bước như tìm hiểu yêu cầu, lập kế hoạch, xây dựng, kiểm thử và review.'] },
      { heading: 'Bắt đầu', paragraphs: ['Hãy dùng các lệnh cài đặt mẫu và đọc README để kiểm tra agent được hỗ trợ cùng cách tích hợp. Việc đánh giá hành vi agent vẫn đang tiếp tục; chưa có tuyên bố cải thiện chất lượng đã được đo lường.'] },
    ],
  },
  'react-native-otp-input-kit': {
    subtitle: 'Bộ nhập OTP và bộ đếm gửi lại cho React Native',
    summary: 'Thư viện input OTP tái sử dụng cho React Native, hỗ trợ dán mã, nhập an toàn, thông báo lỗi, accessibility và đếm ngược gửi lại mã.',
    highlights: ['Input OTP tái sử dụng với TypeScript', 'Dán mã, nhập bảo mật và xử lý trạng thái lỗi', 'Bộ đếm ngược và luồng gửi lại OTP'],
    sections: [
      { heading: 'Vì sao mình xây dựng?', paragraphs: ['Luồng xác minh OTP xuất hiện trong nhiều ứng dụng nhưng thường phải triển khai lại logic nhập mã, paste, trạng thái lỗi và gửi lại. Thư viện giúp chuẩn hóa những thành phần này.'] },
      { heading: 'Cách hoạt động', paragraphs: ['Bộ component và hook dành cho React Native hỗ trợ nhập OTP theo từng ô, quản lý trạng thái và thời gian chờ gửi lại mã. Có thể điều chỉnh giao diện theo sản phẩm.'] },
      { heading: 'Bắt đầu', paragraphs: ['Cài package bằng trình quản lý thư viện ở trên, sau đó xem README để biết API, cấu hình và ví dụ sử dụng.'] },
    ],
  },
  'react-native-splash-view': {
    subtitle: 'Màn hình khởi động native với tùy chọn Lottie',
    summary: 'Thư viện splash screen tái sử dụng cho React Native với tích hợp iOS/Android native, hiệu ứng Lottie tùy chọn và điều khiển từ JavaScript.',
    highlights: ['Tích hợp màn hình khởi động iOS và Android', 'Hỗ trợ animation Lottie tùy chọn', 'Điều khiển splash bằng JavaScript và xử lý sự kiện'],
    sections: [
      { heading: 'Vì sao mình xây dựng?', paragraphs: ['Splash screen là trải nghiệm đầu tiên khi mở ứng dụng, nhưng việc đồng bộ giữa native và JavaScript thường gây bất tiện. Thư viện cung cấp cách kiểm soát rõ ràng hơn cho giai đoạn khởi động.'] },
      { heading: 'Cách hoạt động', paragraphs: ['Package tích hợp với phần native trên iOS và Android, cho phép hiển thị splash và tùy chọn animation Lottie, đồng thời cung cấp cách điều khiển và nhận sự kiện từ JavaScript.'] },
      { heading: 'Bắt đầu', paragraphs: ['Cài package qua terminal phía trên và tham khảo README để cấu hình các bước native cần thiết cho từng nền tảng.'] },
    ],
  },
};

export function projectI18n(project: CollectionEntry<'projects'>, locale: Locale) {
  const vi = projectsVi[project.id];
  return locale === 'vi' && vi
    ? { title: project.data.title, ...vi }
    : { title: project.data.title, subtitle: project.data.subtitle, summary: project.data.summary,
        highlights: project.data.highlights, sections: [] as ProjectTranslation['sections'] };
}
