export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    authorRole: string;
    date: string;
    readTime: string;
    image: string;
    content: { heading?: string; paragraph: string }[];
    tags: string[];
  }
  
  export const blogPosts: BlogPost[] = [
    {
      slug: 'streamline-bridal-appointments',
      title: '5 Ways to Streamline Appointments at Your Boutique',
      excerpt: 'Discover how modern scheduling tools can transform the way your boutique handles consultations, fittings, and follow-ups.',
      category: 'Operations',
      author: 'Emma Laurent',
      authorRole: 'Boutique Operations Consultant',
      date: 'May 18, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
      tags: ['Scheduling', 'Operations', 'Customer Experience'],
      content: [
        { paragraph: 'Boutiques live and die by the appointment book. A messy calendar means missed fittings, double bookings, and clients who feel like a number rather than the star of their day.' },
        { heading: 'Centralize your calendar', paragraph: 'Move every consultation, fitting, and pickup into one unified view so your team always knows what is happening next.' },
        { heading: 'Send automated reminders', paragraph: 'No-shows drop dramatically when clients receive a gentle text 24 hours before their appointment with a confirmation link.' },
        { heading: 'Let clients self-book', paragraph: 'A public booking page eliminates phone tag and captures appointments after hours, when clients are most likely to browse.' },
        { heading: 'Track stylist capacity', paragraph: 'Knowing who is busy and who is free helps you balance workload and shorten wait times.' },
        { heading: 'Close the loop', paragraph: 'After every appointment, a quick follow-up message keeps the conversation warm and nudges clients toward their next milestone.' },
      ],
    },
    {
      slug: 'managing-alterations-without-spreadsheets',
      title: 'Managing Alterations Without the Spreadsheet Chaos',
      excerpt: 'Why alteration tracking deserves dedicated software — and what to look for when choosing a system.',
      category: 'Alterations',
      author: 'FittingFlow Team',
      authorRole: 'FittingFlow',
      date: 'May 04, 2026',
      readTime: '8 min read',
      image: '/uploads/blog.png',
      tags: ['Alterations', 'Workflow', 'Software'],
      content: [
        { paragraph: 'If your alteration log lives in a binder or a single shared spreadsheet, you are leaving money — and trust — on the table.' },
        { heading: 'The hidden cost of paper', paragraph: 'Misplaced measurements lead to rework, unhappy clients, and seamstresses who waste hours hunting for the right ticket.' },
        { heading: 'What good software looks like', paragraph: 'Look for photo capture, signature collection, status tracking, and a clear pickup checklist baked into every work order.' },
        { heading: 'Roll it out gradually', paragraph: 'Start with one seamstress and one dress type. Once the workflow clicks, expand across your team within a few weeks.' },
      ],
    },
    {
      slug: 'building-a-brand-brides-trust',
      title: 'How Top Boutiques Build Trust',
      excerpt: 'Trust is the currency of boutique retail. Here is how the best shops in the country earn it — and keep it.',
      category: 'Marketing',
      author: 'Priya Anand',
      authorRole: 'Brand Strategist',
      date: 'April 22, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
      tags: ['Branding', 'Marketing', 'Growth'],
      content: [
        { paragraph: 'A client chooses a boutique long before they walk through the door. Your website, reviews, and social presence are doing the heavy lifting.' },
        { heading: 'Show real clients', paragraph: 'Authentic photography from your fittings outperforms stock imagery every single time.' },
        { heading: 'Be radically responsive', paragraph: 'Replying within one hour during business hours is the single highest-leverage habit you can build.' },
        { heading: 'Tell the story of your team', paragraph: 'Clients hire people, not businesses. Put your stylists and seamstresses front and center.' },
      ],
    },
    {
      slug: 'from-first-fitting-to-final-walk',
      title: 'From First Fitting to Final Pickup: Designing the Client Journey',
      excerpt: 'A practical framework for mapping every touchpoint in a client\'s experience with your boutique.',
      category: 'Customer Experience',
      author: 'Sofia Ramos',
      authorRole: 'CX Designer',
      date: 'April 10, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80',
      tags: ['Customer Experience', 'Journey Mapping'],
      content: [
        { paragraph: 'Designing the client journey is part choreography, part hospitality. Every moment should feel intentional.' },
        { heading: 'Map the milestones', paragraph: 'Discovery, first consultation, selection, fittings, pickup, and the event itself each deserve a defined experience.' },
        { heading: 'Design the in-between', paragraph: 'The weeks between appointments are where loyalty is built. Plan thoughtful touches at every gap.' },
      ],
    },
    {
      slug: 'pricing-your-services-with-confidence',
      title: 'Pricing Your Services With Confidence',
      excerpt: 'Why most boutiques underprice their alterations — and how to fix it without losing customers.',
      category: 'Business',
      author: 'David Park',
      authorRole: 'Small Business Advisor',
      date: 'March 28, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80',
      tags: ['Pricing', 'Business', 'Revenue'],
      content: [
        { paragraph: 'Underpricing is the silent killer of boutique businesses. Here is how to raise your rates with confidence.' },
        { heading: 'Know your numbers', paragraph: 'Track the true labor hours behind every alteration before you set a price.' },
        { heading: 'Bundle thoughtfully', paragraph: 'Packages help clients budget and protect your margins.' },
      ],
    },
    {
      slug: 'sms-marketing-for-bridal-boutiques',
      title: 'SMS Marketing for Boutiques That Actually Works',
      excerpt: 'How to use text messaging to keep your boutique top of mind without ever feeling pushy.',
      category: 'Marketing',
      author: 'Lena Wright',
      authorRole: 'Marketing Lead, FittingFlow',
      date: 'March 14, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
      tags: ['SMS', 'Marketing', 'Retention'],
      content: [
        { paragraph: 'Clients open texts within minutes. Email cannot compete on urgency or intimacy.' },
        { heading: 'Keep it personal', paragraph: 'Use the client\'s name, reference their order, and sign off as a real person.' },
        { heading: 'Respect the inbox', paragraph: 'One thoughtful message beats five generic blasts.' },
      ],
    },
  ];
  
  export const getBlogPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
  