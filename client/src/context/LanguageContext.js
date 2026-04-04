import { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      services: 'Services',
      qualification: 'Qualification',
      portfolio: 'Portfolio',
      contact: 'Contact',
    },
    home: {
      subtitle: 'Fullstack Developer',
      description: 'I am a Fullstack developer based in Hue, Vietnam. My passion is to build beautiful and high-performance websites.',
      cta: 'Say Hello',
    },
    about: {
      title: 'About Me',
      subtitle: 'My Introduction',
      description: 'I was born and raised in Hue city, Vietnam. I am a student at Phu Xuan University majoring in Information Technology. My passion is to become a Fullstack developer specializing in web application design.',
      downloadCV: 'Download CV',
      expLabel: 'Years Experience',
      expValue: '3+ Years',
      projectLabel: 'Projects Completed',
      projectValue: '20+',
      supportLabel: 'Support',
      supportValue: 'Online 24/7',
    },
    skills: {
      title: 'My Skills',
      subtitle: 'My Technical Level',
      frontend: 'Frontend Developer',
      backend: 'Backend Developer',
    },
    services: {
      title: 'Services',
      subtitle: 'What I Offer',
      viewMore: 'View more',
      frontend: {
        title: 'Frontend Developer',
        description: 'Front-end web development is the practice of producing HTML, CSS and JavaScript for a website so that users can see and interact with them directly.',
        items: [
          'Optimizing the user experience.',
          'Using HTML, JavaScript and CSS to bring concepts to life.',
          'Developing and maintaining the user interface.',
        ],
      },
      react: {
        title: 'ReactJS Developer',
        description: 'React developers are software professionals who work with React to build user interfaces. They are also front-end and JavaScript developers.',
        items: [
          'Build web applications or use React Native to develop mobile apps.',
          'Developing responsive interactive technology for dynamic web pages.',
          'Consulting with back-end engineers to ensure smooth interactions.',
        ],
      },
      fullstack: {
        title: 'Fullstack Developer',
        description: 'A full-stack developer can build both the front end and back end of a website, handling different skill sets for each side.',
        items: [
          'Develop and maintain web services and interfaces.',
          'Contribute to front-end and back-end development processes.',
          'Build new product features or APIs and perform tests, troubleshoot and fix bugs.',
        ],
      },
    },
    qualification: {
      title: 'Qualification',
      subtitle: 'My Qualification Level',
      education: 'Education',
      experience: 'Experience',
      edu: [
        { title: 'Third year college student', place: 'Hue - Viet Nam', date: '2021 - Present' },
        { title: 'Second year university student', place: 'Hue - Viet Nam', date: '2020 - 2021' },
        { title: 'First year university student', place: 'Hue - Viet Nam', date: '12/2020' },
        { title: 'Admitted to Phu Xuan University, majoring in Information Technology', place: 'Hue - Viet Nam', date: '04/2020' },
      ],
      exp: [
        { title: 'Learned PHP, Java Spring, C#, Wordpress, and self-taught JavaScript, ReactJS and NodeJS', place: 'Hue - Viet Nam', date: '2021 - Present' },
        { title: 'Learned data structures and algorithms, SQL Server, MySQL and self-taught HTML, CSS', place: 'Hue - Viet Nam', date: '2020 - 2021' },
        { title: 'Learning basic Java, algorithmic thinking and MVC pattern', place: 'Hue - Viet Nam', date: '2022' },
        { title: 'First time getting acquainted with the IT industry', place: 'Hue - Viet Nam', date: '06/2020' },
      ],
    },
    portfolio: {
      title: 'My Projects',
      subtitle: 'Most Recent Projects',
      viewDetail: 'View Detail',
      detail: 'Detail',
      live: 'Live',
      code: 'Code',
      empty: 'No projects yet.',
      error: 'Unable to load projects. Please try again later.',
    },
    contact: {
      title: 'Get in touch',
      subtitle: 'Contact Me',
      talkToMe: 'Talk to me',
      writeProject: 'Write me your project',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      namePlaceholder: 'Insert your name',
      emailPlaceholder: 'Insert your email',
      subjectPlaceholder: 'Project inquiry, collaboration...',
      messagePlaceholder: 'Write your message...',
      send: 'Send Message',
      sending: 'Sending...',
      writeMe: 'Write me',
      successMsg: 'Message sent! I will reply as soon as possible.',
      errorMsg: 'An error occurred, please try again.',
    },
    footer: {
      about: 'About',
      project: 'Project',
      testimonials: 'Testimonials',
      copyright: '© LeQuocDuyMyCV. All rights of Le Cong Quoc Duy',
    },
  },

  vi: {
    nav: {
      home: 'Trang chủ',
      about: 'Giới thiệu',
      skills: 'Kỹ năng',
      services: 'Dịch vụ',
      qualification: 'Bằng cấp',
      portfolio: 'Dự án',
      contact: 'Liên hệ',
    },
    home: {
      subtitle: 'Lập trình viên Fullstack',
      description: 'Tôi là lập trình viên Fullstack tại Huế, Việt Nam. Đam mê của tôi là xây dựng những trang web đẹp và hiệu suất cao.',
      cta: 'Liên hệ ngay',
    },
    about: {
      title: 'Về tôi',
      subtitle: 'Giới thiệu bản thân',
      description: 'Tôi sinh ra và lớn lên ở thành phố Huế, Việt Nam. Tôi là sinh viên Đại học Phú Xuân, chuyên ngành Công nghệ thông tin. Đam mê của tôi là trở thành lập trình viên Fullstack chuyên về thiết kế ứng dụng web.',
      downloadCV: 'Tải CV',
      expLabel: 'Năm kinh nghiệm',
      expValue: '3+ Năm',
      projectLabel: 'Dự án hoàn thành',
      projectValue: '20+',
      supportLabel: 'Hỗ trợ',
      supportValue: 'Online 24/7',
    },
    skills: {
      title: 'Kỹ năng của tôi',
      subtitle: 'Trình độ kỹ thuật',
      frontend: 'Lập trình viên Frontend',
      backend: 'Lập trình viên Backend',
    },
    services: {
      title: 'Dịch vụ',
      subtitle: 'Tôi cung cấp gì',
      viewMore: 'Xem thêm',
      frontend: {
        title: 'Lập trình Frontend',
        description: 'Phát triển giao diện người dùng bao gồm HTML, CSS và JavaScript để người dùng có thể xem và tương tác trực tiếp.',
        items: [
          'Tối ưu hóa trải nghiệm người dùng.',
          'Sử dụng HTML, JavaScript và CSS để hiện thực hóa ý tưởng.',
          'Phát triển và bảo trì giao diện người dùng.',
        ],
      },
      react: {
        title: 'Lập trình ReactJS',
        description: 'Lập trình viên React sử dụng React để xây dựng giao diện người dùng, đồng thời là lập trình viên frontend và JavaScript.',
        items: [
          'Xây dựng ứng dụng web hoặc sử dụng React Native để phát triển ứng dụng di động.',
          'Phát triển công nghệ tương tác đáp ứng cho trang web động.',
          'Phối hợp với backend để đảm bảo tương tác trơn tru.',
        ],
      },
      fullstack: {
        title: 'Lập trình Fullstack',
        description: 'Lập trình viên Fullstack có thể xây dựng cả frontend và backend của website, xử lý các kỹ năng khác nhau cho từng phía.',
        items: [
          'Phát triển và bảo trì dịch vụ web và giao diện.',
          'Đóng góp vào quy trình phát triển frontend và backend.',
          'Xây dựng tính năng mới, API, kiểm thử và sửa lỗi.',
        ],
      },
    },
    qualification: {
      title: 'Bằng cấp',
      subtitle: 'Quá trình học tập và làm việc',
      education: 'Học vấn',
      experience: 'Kinh nghiệm',
      edu: [
        { title: 'Sinh viên năm ba đại học', place: 'Huế - Việt Nam', date: '2021 - Hiện tại' },
        { title: 'Sinh viên năm hai đại học', place: 'Huế - Việt Nam', date: '2020 - 2021' },
        { title: 'Sinh viên năm nhất đại học', place: 'Huế - Việt Nam', date: '12/2020' },
        { title: 'Nhập học Đại học Phú Xuân, chuyên ngành Công nghệ thông tin', place: 'Huế - Việt Nam', date: '04/2020' },
      ],
      exp: [
        { title: 'Học PHP, Java Spring, C#, Wordpress, và tự học JavaScript, ReactJS và NodeJS', place: 'Huế - Việt Nam', date: '2021 - Hiện tại' },
        { title: 'Học cấu trúc dữ liệu, thuật toán, SQL Server, MySQL và tự học HTML, CSS', place: 'Huế - Việt Nam', date: '2020 - 2021' },
        { title: 'Học Java cơ bản, tư duy thuật toán và mô hình MVC', place: 'Huế - Việt Nam', date: '2022' },
        { title: 'Lần đầu tiếp xúc với ngành IT', place: 'Huế - Việt Nam', date: '06/2020' },
      ],
    },
    portfolio: {
      title: 'Dự án của tôi',
      subtitle: 'Các dự án đã thực hiện',
      viewDetail: 'Xem chi tiết',
      detail: 'Chi tiết',
      live: 'Live',
      code: 'Code',
      empty: 'Chưa có dự án nào.',
      error: 'Không thể tải dự án. Vui lòng thử lại sau.',
    },
    contact: {
      title: 'Liên hệ',
      subtitle: 'Liên lạc với tôi',
      talkToMe: 'Nói chuyện với tôi',
      writeProject: 'Viết cho tôi về dự án của bạn',
      name: 'Tên',
      email: 'Email',
      subject: 'Tiêu đề',
      message: 'Tin nhắn',
      namePlaceholder: 'Nhập tên của bạn',
      emailPlaceholder: 'Nhập email của bạn',
      subjectPlaceholder: 'Hỏi về dự án, hợp tác...',
      messagePlaceholder: 'Viết tin nhắn của bạn...',
      send: 'Gửi tin nhắn',
      sending: 'Đang gửi...',
      writeMe: 'Nhắn tin',
      successMsg: 'Tin nhắn đã được gửi! Tôi sẽ phản hồi sớm nhất có thể.',
      errorMsg: 'Có lỗi xảy ra, vui lòng thử lại.',
    },
    footer: {
      about: 'Giới thiệu',
      project: 'Dự án',
      testimonials: 'Đánh giá',
      copyright: '© LeQuocDuyMyCV. Mọi quyền thuộc về Lê Công Quốc Duy',
    },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  function toggleLang() {
    const next = lang === 'en' ? 'vi' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
