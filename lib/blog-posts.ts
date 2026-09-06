export type BlogPost = {
slug: string;
title: string;
description: string;
targetQuery: string;
dateLabel: string;
};
export const BLOG_POSTS: BlogPost[] = [
{
slug: "after-hours-inbox-for-local-shops",
title: "After-Hours Inbox for Local Shops",
description:
"How a local shop can keep an after-hours inbox without claiming mail went out. Draft a polite hold, log name, phone, want, and time.",
targetQuery: "after hours inbox for small business",
dateLabel: "Sep 2026",
},
{
slug: "stop-losing-weekend-website-inquiries",
title: "Stop Losing Weekend Website Inquiries",
description:
"Weekend website notes do not have to vanish. Log missed Saturday and Sunday inquiries so Monday morning starts with a paper list.",
targetQuery: "missed weekend website inquiries small business",
dateLabel: "Sep 2026",
},
{
slug: "after-hours-customer-messages-for-local-shops",
title: "After-Hours Customer Messages for Local Shops",
description:
"Customers still write after the door locks. How dental, salon, bakery, and glass shops can log after-hours messages for 8 a.m.",
targetQuery: "after hours customer messages for local shops",
dateLabel: "Sep 2026",
},
];
export function getPost(slug: string) {
return BLOG_POSTS.find((post) => post.slug === slug);
}
