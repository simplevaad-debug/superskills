export interface Skill {
  name: string;
  slug: string;
  description: string;
}

export interface Category {
  name: string;
  icon: string;
  skills: Skill[];
}

export const categories: Category[] = [
  {
    name: "Frontend Development",
    icon: "Monitor",
    skills: [
      { name: "React Expert", slug: "react-expert", description: "React 18+ with Server Components, Suspense, hooks, and performance optimization" },
      { name: "Next.js Developer", slug: "nextjs-developer", description: "Next.js 14+ App Router, server actions, streaming SSR, and Vercel deployment" },
      { name: "Vue Expert", slug: "vue-expert", description: "Vue 3 Composition API, Nuxt 3 SSR/SSG, Pinia stores, and Vite builds" },
      { name: "Vue Expert JS", slug: "vue-expert-js", description: "Vue 3 with vanilla JavaScript, JSDoc typing, no TypeScript compiler needed" },
      { name: "Angular Architect", slug: "angular-architect", description: "Angular 17+ standalone components, signals, NgRx, and enterprise patterns" },
      { name: "TypeScript Pro", slug: "typescript-pro", description: "Advanced generics, conditional types, branded types, and tRPC full-stack safety" },
      { name: "JavaScript Pro", slug: "javascript-pro", description: "Modern ES2023+, async/await patterns, ESM modules, and Node.js APIs" },
      { name: "React Native Expert", slug: "react-native-expert", description: "Cross-platform mobile apps with Expo, navigation, native modules, and performance" },
      { name: "Flutter Expert", slug: "flutter-expert", description: "Cross-platform apps with Flutter 3+, Riverpod/Bloc state, and platform-specific code" },
      { name: "Creative Motion Design", slug: "creative-motion-design", description: "Framer Motion animations, cinematic backgrounds, anti-generic UI philosophy" },
      { name: "UI/UX Pro Max", slug: "ui-ux-pro-max", description: "50 styles, 21 palettes, 50 font pairings across React, Next.js, Vue, Svelte, and more" },
    ],
  },
  {
    name: "Backend & Frameworks",
    icon: "Server",
    skills: [
      { name: "FastAPI Expert", slug: "fastapi-expert", description: "Async Python APIs with Pydantic V2, SQLAlchemy, JWT auth, and OpenAPI docs" },
      { name: "Django Expert", slug: "django-expert", description: "Django REST Framework, ORM optimization, Celery tasks, and security best practices" },
      { name: "Rails Expert", slug: "rails-expert", description: "Rails 7+ with Hotwire, Turbo Streams, Action Cable, Sidekiq, and RSpec" },
      { name: "NestJS Expert", slug: "nestjs-expert", description: "Enterprise TypeScript backends with DI, guards, interceptors, and Swagger" },
      { name: "Laravel Specialist", slug: "laravel-specialist", description: "Laravel 10+ with Eloquent, Sanctum auth, Horizon queues, and Livewire" },
      { name: "Spring Boot Engineer", slug: "spring-boot-engineer", description: "Spring Boot 3.x, Spring Security 6, WebFlux, and Spring Cloud microservices" },
      { name: "Golang Pro", slug: "golang-pro", description: "Concurrent Go with goroutines, channels, gRPC, generics, and table-driven tests" },
      { name: "Rust Engineer", slug: "rust-engineer", description: "Memory-safe systems with ownership, lifetimes, async tokio, and zero-cost abstractions" },
      { name: "Python Pro", slug: "python-pro", description: "Type-annotated Python 3.11+, async/await, pytest, mypy strict mode, and ruff" },
      { name: "PHP Pro", slug: "php-pro", description: "Modern PHP 8.3+ with strict typing, PHPStan level 9, Swoole, and PSR standards" },
      { name: "C# Developer", slug: "csharp-developer", description: ".NET 8+ APIs, Blazor, Entity Framework Core, CQRS with MediatR, and SignalR" },
      { name: "C++ Pro", slug: "cpp-pro", description: "Modern C++20/23 with concepts, ranges, coroutines, SIMD, and CMake builds" },
      { name: "Java Architect", slug: "java-architect", description: "Spring Boot 3.x enterprise apps, WebFlux, JPA optimization, and OAuth2/JWT" },
      { name: ".NET Core Expert", slug: "dotnet-core-expert", description: ".NET 8 minimal APIs, clean architecture, AOT compilation, and cloud-native patterns" },
    ],
  },
  {
    name: "Databases & Data",
    icon: "Database",
    skills: [
      { name: "Postgres Pro", slug: "postgres-pro", description: "EXPLAIN analysis, JSONB operations, replication, extension management, and VACUUM tuning" },
      { name: "SQL Pro", slug: "sql-pro", description: "Complex queries, window functions, CTEs, indexing strategies, and cross-dialect migration" },
      { name: "Database Optimizer", slug: "database-optimizer", description: "Query optimization, execution plan analysis, index design, and partitioning strategies" },
      { name: "Pandas Pro", slug: "pandas-pro", description: "DataFrame operations, data cleaning, aggregation, time series, and performance tuning" },
      { name: "Spark Engineer", slug: "spark-engineer", description: "Distributed data processing, Spark SQL, DataFrame transformations, and streaming" },
      { name: "GraphQL Architect", slug: "graphql-architect", description: "Schema design, Apollo Federation, DataLoader, subscriptions, and query optimization" },
    ],
  },
  {
    name: "DevOps & Infrastructure",
    icon: "Cloud",
    skills: [
      { name: "Kubernetes Specialist", slug: "kubernetes-specialist", description: "Deployments, Helm charts, RBAC, NetworkPolicies, and multi-cluster management" },
      { name: "Terraform Engineer", slug: "terraform-engineer", description: "Infrastructure as code across AWS/Azure/GCP with modules, state management, and testing" },
      { name: "Cloud Architect", slug: "cloud-architect", description: "Multi-cloud architectures, Well-Architected Framework, cost optimization, and DR planning" },
      { name: "DevOps Engineer", slug: "devops-engineer", description: "CI/CD pipelines, Docker, GitOps, incident response, and platform engineering" },
      { name: "Monitoring Expert", slug: "monitoring-expert", description: "Prometheus/Grafana stacks, structured logging, distributed tracing, and load testing" },
      { name: "SRE Engineer", slug: "sre-engineer", description: "SLIs/SLOs, error budgets, incident management, chaos engineering, and capacity planning" },
      { name: "Chaos Engineer", slug: "chaos-engineer", description: "Failure injection frameworks, game day exercises, blast radius control, and runbooks" },
      { name: "Embedded Systems", slug: "embedded-systems", description: "Firmware for STM32/ESP32, FreeRTOS, power optimization, and real-time systems" },
      { name: "WebSocket Engineer", slug: "websocket-engineer", description: "Real-time bidirectional messaging, Socket.IO, Redis scaling, and presence tracking" },
      { name: "Swift Expert", slug: "swift-expert", description: "iOS/macOS apps with SwiftUI, async/await, actors, protocol-oriented architecture" },
      { name: "Kotlin Specialist", slug: "kotlin-specialist", description: "Coroutines, Flow, Compose UI, Ktor servers, KMP, and type-safe DSL design" },
    ],
  },
  {
    name: "API & System Design",
    icon: "Network",
    skills: [
      { name: "API Designer", slug: "api-designer", description: "REST/GraphQL API design, OpenAPI specs, versioning, pagination, and error standards" },
      { name: "Microservices Architect", slug: "microservices-architect", description: "Service boundaries, DDD, saga patterns, event sourcing, CQRS, and service mesh" },
      { name: "Architecture Designer", slug: "architecture-designer", description: "System design, ADRs, component diagrams, scalability planning, and trade-off analysis" },
      { name: "Legacy Modernizer", slug: "legacy-modernizer", description: "Strangler fig pattern, monolith decomposition, API facades, and migration roadmaps" },
      { name: "Feature Forge", slug: "feature-forge", description: "Requirements workshops, user stories, EARS-format specs, and acceptance criteria" },
    ],
  },
  {
    name: "Code Quality & Security",
    icon: "Shield",
    skills: [
      { name: "Security Reviewer", slug: "security-reviewer", description: "Vulnerability audits, SAST scans, DevSecOps, dependency audits, and compliance checks" },
      { name: "Code Reviewer", slug: "code-reviewer", description: "PR reviews, bug detection, N+1 queries, security vulnerabilities, and refactoring advice" },
      { name: "Debugging Wizard", slug: "debugging-wizard", description: "Error parsing, stack trace analysis, log correlation, and hypothesis-driven debugging" },
      { name: "Secure Code Guardian", slug: "secure-code-guardian", description: "OWASP Top 10 prevention, bcrypt/argon2, CORS/CSP, Zod validation, and JWT setup" },
      { name: "Fullstack Guardian", slug: "fullstack-guardian", description: "Security-focused full-stack development with layered auth and validation at every level" },
      { name: "Code Documenter", slug: "code-documenter", description: "Docstrings, OpenAPI/Swagger specs, JSDoc, documentation portals, and user guides" },
      { name: "Spec Miner", slug: "spec-miner", description: "Reverse-engineer specs from legacy codebases, map dependencies, and document business logic" },
    ],
  },
  {
    name: "Conversion Optimization",
    icon: "TrendingUp",
    skills: [
      { name: "Page CRO", slug: "page-cro", description: "Optimize any marketing page for higher conversions — homepage, landing, pricing, features" },
      { name: "Form CRO", slug: "form-cro", description: "Optimize lead capture, contact, demo request, and checkout forms for completion rate" },
      { name: "Signup Flow CRO", slug: "signup-flow-cro", description: "Reduce signup friction, optimize registration flows, and boost trial activation" },
      { name: "Onboarding CRO", slug: "onboarding-cro", description: "Post-signup activation, first-run experience, empty states, and time-to-value" },
      { name: "Popup CRO", slug: "popup-cro", description: "Exit intent popups, slide-ins, banners, and overlay conversion optimization" },
      { name: "Paywall Upgrade CRO", slug: "paywall-upgrade-cro", description: "In-app paywalls, upgrade modals, feature gates, and freemium-to-paid conversion" },
      { name: "A/B Test Setup", slug: "ab-test-setup", description: "Experiment design, hypothesis writing, variant creation, and statistical significance" },
      { name: "Analytics Tracking", slug: "analytics-tracking", description: "GA4, GTM, event tracking, UTM parameters, conversion tracking, and attribution" },
      { name: "Churn Prevention", slug: "churn-prevention", description: "Cancellation flows, save offers, dunning, failed payment recovery, and win-back" },
      { name: "Pricing Strategy", slug: "pricing-strategy", description: "Pricing tiers, freemium vs trial, value metrics, Van Westendorp, and packaging" },
    ],
  },
  {
    name: "SEO & Content",
    icon: "Search",
    skills: [
      { name: "SEO Audit", slug: "seo-audit", description: "Technical SEO, meta tags, Core Web Vitals, crawl errors, and ranking diagnostics" },
      { name: "AI SEO", slug: "ai-seo", description: "Optimize for AI search engines — ChatGPT, Perplexity, AI Overviews, and LLM citations" },
      { name: "Programmatic SEO", slug: "programmatic-seo", description: "Template-based pages at scale — location pages, comparison pages, directory pages" },
      { name: "Schema Markup", slug: "schema-markup", description: "JSON-LD structured data, rich snippets, FAQ schema, product schema, and knowledge panels" },
      { name: "Site Architecture", slug: "site-architecture", description: "Page hierarchy, navigation design, URL structure, breadcrumbs, and internal linking" },
      { name: "Copywriting", slug: "copywriting", description: "Headlines, CTAs, value propositions, hero copy, and persuasive marketing pages" },
      { name: "Copy Editing", slug: "copy-editing", description: "Polish and tighten existing marketing copy — proofreading, clarity, and messaging" },
      { name: "Content Strategy", slug: "content-strategy", description: "Topic clusters, editorial calendars, content pillars, and content marketing roadmaps" },
      { name: "Competitor Alternatives", slug: "competitor-alternatives", description: "Alternative pages, vs pages, battle cards, and competitive positioning content" },
    ],
  },
  {
    name: "Sales & Outbound",
    icon: "Mail",
    skills: [
      { name: "Cold Email", slug: "cold-email", description: "B2B cold outreach that gets replies — subject lines, personalization, and follow-up sequences" },
      { name: "Email Sequence", slug: "email-sequence", description: "Drip campaigns, welcome series, nurture sequences, and lifecycle email automation" },
      { name: "Sales Enablement", slug: "sales-enablement", description: "Pitch decks, one-pagers, objection handling, demo scripts, and sales playbooks" },
      { name: "Social Content", slug: "social-content", description: "LinkedIn posts, Twitter threads, content calendars, and platform-specific optimization" },
      { name: "Lead Magnets", slug: "lead-magnets", description: "Ebooks, checklists, templates, content upgrades, and gated content strategies" },
      { name: "RevOps", slug: "revops", description: "Lead scoring, routing, MQL/SQL lifecycle, CRM automation, and pipeline management" },
    ],
  },
  {
    name: "Marketing Strategy",
    icon: "Megaphone",
    skills: [
      { name: "Marketing Psychology", slug: "marketing-psychology", description: "Cognitive biases, social proof, scarcity, loss aversion, framing, and nudge theory" },
      { name: "Launch Strategy", slug: "launch-strategy", description: "Product Hunt launches, beta programs, waitlists, go-to-market plans, and announcements" },
      { name: "Paid Ads", slug: "paid-ads", description: "Google Ads, Meta, LinkedIn campaigns — targeting, bidding, ROAS optimization" },
      { name: "Ad Creative", slug: "ad-creative", description: "Bulk ad variations — headlines, descriptions, primary text for any ad platform" },
      { name: "Marketing Ideas", slug: "marketing-ideas", description: "SaaS growth strategies, channel ideas, brainstorms, and tactical marketing inspiration" },
      { name: "Product Marketing Context", slug: "product-marketing-context", description: "Positioning, ICP, target audience, and foundational context for all marketing tasks" },
      { name: "Free Tool Strategy", slug: "free-tool-strategy", description: "Engineering as marketing — calculators, generators, audit tools for lead generation" },
      { name: "Referral Program", slug: "referral-program", description: "Refer-a-friend programs, affiliate systems, viral loops, and word-of-mouth strategies" },
      { name: "The Fool", slug: "the-fool", description: "Devil's advocate, pre-mortems, red teaming, and structured critical reasoning" },
    ],
  },
  {
    name: "AI & Machine Learning",
    icon: "Brain",
    skills: [
      { name: "RAG Architect", slug: "rag-architect", description: "Vector databases, chunking, embeddings, hybrid search, reranking, and retrieval pipelines" },
      { name: "ML Pipeline", slug: "ml-pipeline", description: "MLflow, Kubeflow, feature stores, experiment tracking, and model lifecycle automation" },
      { name: "Fine-Tuning Expert", slug: "fine-tuning-expert", description: "LoRA/QLoRA, PEFT, training datasets, hyperparameters, RLHF, DPO, and deployment" },
      { name: "Prompt Engineer", slug: "prompt-engineer", description: "Prompt templates, chain-of-thought, few-shot learning, system prompts, and evaluation" },
    ],
  },
  {
    name: "Specialized Domains",
    icon: "Gamepad2",
    skills: [
      { name: "Game Developer", slug: "game-developer", description: "Unity/Unreal Engine, ECS architecture, physics, multiplayer networking, and shaders" },
      { name: "MCP Developer", slug: "mcp-developer", description: "Build MCP servers/clients — tool handlers, resource providers, and protocol implementation" },
      { name: "CLI Developer", slug: "cli-developer", description: "Argument parsing, interactive prompts, progress bars, and shell completion scripts" },
      { name: "Spec-Driven Development", slug: "spec-driven-development", description: "Keep implementation and specs in sync — verify code against specifications" },
      { name: "Parallel Orchestrator", slug: "parallel-orchestrator", description: "Auto-decompose complex tasks into parallel subagent teams for maximum throughput" },
    ],
  },
  {
    name: "Platform-Specific",
    icon: "Store",
    skills: [
      { name: "Shopify Expert", slug: "shopify-expert", description: "Liquid themes, Hydrogen storefronts, Shopify apps, checkout extensions, and Polaris" },
      { name: "WordPress Pro", slug: "wordpress-pro", description: "Custom themes, Gutenberg blocks, WooCommerce, REST API, hooks, and security hardening" },
      { name: "Salesforce Developer", slug: "salesforce-developer", description: "Apex code, Lightning Web Components, SOQL optimization, and platform events" },
      { name: "Atlassian MCP", slug: "atlassian-mcp", description: "Jira JQL queries, Confluence CQL search, sprint management, and API integration" },
    ],
  },
  {
    name: "Testing & Automation",
    icon: "TestTube",
    skills: [
      { name: "Playwright Expert", slug: "playwright-expert", description: "E2E browser tests, Page Object Model, visual regression, API mocking, and CI setup" },
      { name: "Test Master", slug: "test-master", description: "Unit/integration/E2E test strategies, mocking, coverage analysis, and test architecture" },
    ],
  },
  {
    name: "Enterprise & Architecture",
    icon: "Building2",
    skills: [
      { name: "Architecture Designer", slug: "architecture-designer", description: "System design, ADRs, architecture diagrams, scalability, and technology trade-offs" },
      { name: "Microservices Architect", slug: "microservices-architect", description: "Bounded contexts, saga orchestration, event sourcing, CQRS, and service mesh" },
      { name: "Legacy Modernizer", slug: "legacy-modernizer", description: "Incremental migration, strangler fig, dependency mapping, and modernization roadmaps" },
    ],
  },
];

export const totalSkills = categories.reduce((sum, cat) => sum + cat.skills.length, 0);
export const totalCategories = categories.length;
