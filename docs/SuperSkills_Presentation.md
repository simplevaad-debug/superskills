<div style="text-align: center; padding: 80px 40px; background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #1e40af 100%); border-radius: 20px; margin: 20px 0;">
  <h1 style="color: #ffffff; font-size: 3.5em; font-weight: 800; margin-bottom: 10px; letter-spacing: -1px;">SuperSkills</h1>
  <h2 style="color: #93c5fd; font-size: 1.8em; font-weight: 400; margin-bottom: 30px;">106 Pro Skills for Claude Code</h2>
  <hr style="border: 1px solid rgba(255,255,255,0.2); width: 60%; margin: 20px auto;">
  <h3 style="color: #f97316; font-size: 1.4em; font-weight: 500;">Supercharge your AI coding assistant</h3>
  <p style="color: rgba(255,255,255,0.6); margin-top: 40px; font-size: 0.9em;">A product presentation</p>
</div>

---

# The Problem

<div style="padding: 30px; background: #fef2f2; border-left: 5px solid #ef4444; border-radius: 10px; margin: 20px 0;">

### Developers are leaving performance on the table

| Pain Point | Impact |
|:---|:---|
| **Generic responses** | Claude Code doesn't know your stack's best practices out of the box |
| **Prompt engineering fatigue** | Hours spent crafting the perfect prompt for each framework |
| **No domain expertise** | No built-in knowledge of Next.js 15 patterns, Supabase RLS, Tailwind v4, etc. |
| **Inconsistent output** | Different quality every time you start a new conversation |
| **Context lost** | Best practices and conventions must be re-explained every session |

</div>

> *"I spend more time explaining what I want than actually building."*  
> -- Every developer using AI assistants without proper configuration

---

# The Solution

<div style="padding: 30px; background: #f0fdf4; border-left: 5px solid #22c55e; border-radius: 10px; margin: 20px 0;">

### SuperSkills: Pre-built expert skills for Claude Code

Turn Claude Code from a **generalist** into a **specialist** in any domain.

</div>

### How it feels:

```
You:  /nextjs-pro
Claude: I'm now a Next.js 15 expert. I'll use App Router, Server Components,
        proper caching strategies, and follow all current best practices.
        What are we building?
```

```
You:  /supabase-pro  
Claude: I'm now a Supabase specialist. I'll set up RLS policies, optimize
        queries, use edge functions properly, and follow security best practices.
        Show me your schema.
```

```
You:  /landing-page-conversion
Claude: I'm now a conversion optimization expert. I'll structure your page
        for maximum conversions using proven frameworks, psychological triggers,
        and A/B testing best practices. Let's optimize.
```

**Just type `/skill-name` and go.** No prompting. No explaining. Instant expertise.

---

# By The Numbers

```python
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

fig, ax = plt.subplots(figsize=(14, 5))
fig.patch.set_facecolor('#0f172a')
ax.set_facecolor('#0f172a')
ax.axis('off')

stats = [
    ('106', 'Pro Skills', '#2563eb'),
    ('15', 'Categories', '#f97316'),
    ('Every', 'Major Stack', '#22c55e'),
    ('$50', 'One-Time', '#a855f7'),
]

for i, (number, label, color) in enumerate(stats):
    x = 0.125 + i * 0.25
    # Glow circle
    circle = plt.Circle((x, 0.55), 0.12, transform=ax.transAxes,
                        color=color, alpha=0.15, zorder=1)
    ax.add_patch(circle)
    # Number
    ax.text(x, 0.58, number, transform=ax.transAxes,
            fontsize=42, fontweight='bold', color=color,
            ha='center', va='center', family='sans-serif')
    # Label
    ax.text(x, 0.2, label, transform=ax.transAxes,
            fontsize=16, color='#94a3b8',
            ha='center', va='center', family='sans-serif')

ax.set_xlim(0, 1)
ax.set_ylim(0, 1)
plt.tight_layout()
plt.show()
```

---

# Category Breakdown

```python
import matplotlib.pyplot as plt
import numpy as np

categories = [
    'Backend & Frameworks',
    'Frontend Development',
    'DevOps & Infrastructure',
    'Conversion Optimization',
    'SEO & Content',
    'Marketing Strategy',
    'Code Quality & Security',
    'Databases & Data',
    'Sales & Outbound',
    'API & System Design',
    'Specialized Domains',
    'AI & Machine Learning',
    'Platform-Specific',
    'Testing & Automation',
    'Enterprise & Architecture',
]

counts = [14, 11, 11, 10, 9, 9, 7, 6, 6, 5, 5, 4, 4, 3, 3]

# Color palette
colors = [
    '#2563eb', '#3b82f6', '#60a5fa',
    '#f97316', '#fb923c', '#fdba74',
    '#22c55e', '#4ade80',
    '#a855f7', '#c084fc',
    '#ec4899', '#f472b6',
    '#06b6d4', '#14b8a6', '#6366f1',
]

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(18, 8),
                                gridspec_kw={'width_ratios': [2, 1]})
fig.patch.set_facecolor('#ffffff')

# --- Horizontal Bar Chart ---
y_pos = np.arange(len(categories))
bars = ax1.barh(y_pos, counts, color=colors, height=0.7, edgecolor='white', linewidth=0.5)
ax1.set_yticks(y_pos)
ax1.set_yticklabels(categories, fontsize=11, fontweight='500', color='#1e293b')
ax1.invert_yaxis()
ax1.set_xlabel('Number of Skills', fontsize=12, color='#475569', labelpad=10)
ax1.set_title('Skills per Category', fontsize=16, fontweight='bold', color='#0f172a', pad=15)
ax1.spines['top'].set_visible(False)
ax1.spines['right'].set_visible(False)
ax1.spines['bottom'].set_color('#e2e8f0')
ax1.spines['left'].set_visible(False)
ax1.tick_params(axis='x', colors='#94a3b8')
ax1.set_facecolor('#f8fafc')
ax1.set_xlim(0, 17)

# Add count labels
for bar, count in zip(bars, counts):
    ax1.text(bar.get_width() + 0.3, bar.get_y() + bar.get_height()/2,
             str(count), va='center', fontsize=11, fontweight='bold', color='#475569')

# --- Donut Chart ---
# Group smaller categories
group_names = ['Development\n(42)', 'Marketing &\nSales (34)', 'Quality &\nOps (20)', 'Specialized\n(10)']
group_sizes = [42, 34, 20, 10]
group_colors = ['#2563eb', '#f97316', '#22c55e', '#a855f7']

wedges, texts, autotexts = ax2.pie(
    group_sizes, labels=group_names, colors=group_colors,
    autopct='%1.0f%%', startangle=90, pctdistance=0.75,
    wedgeprops=dict(width=0.4, edgecolor='white', linewidth=2),
    textprops=dict(fontsize=10, color='#1e293b')
)
for t in autotexts:
    t.set_fontsize(11)
    t.set_fontweight('bold')
    t.set_color('white')

ax2.text(0, 0, '106\nSkills', ha='center', va='center',
         fontsize=22, fontweight='bold', color='#0f172a')
ax2.set_title('Skill Distribution', fontsize=16, fontweight='bold', color='#0f172a', pad=15)

plt.tight_layout(pad=3)
plt.show()
```

### Full Category Table

| # | Category | Skills | Focus Areas |
|:-:|:---|:-:|:---|
| 1 | **Frontend Development** | 11 | React, Next.js, Vue, Svelte, Tailwind, Framer Motion |
| 2 | **Backend & Frameworks** | 14 | Node.js, Python, Django, Rails, Go, Rust, GraphQL |
| 3 | **Databases & Data** | 6 | PostgreSQL, Supabase, MongoDB, Redis, Prisma |
| 4 | **DevOps & Infrastructure** | 11 | Docker, K8s, CI/CD, AWS, GCP, Terraform, Vercel |
| 5 | **API & System Design** | 5 | REST, GraphQL, WebSockets, Microservices |
| 6 | **Code Quality & Security** | 7 | Testing, Linting, Security Audits, Performance |
| 7 | **Conversion Optimization** | 10 | Landing Pages, CTAs, A/B Testing, Funnels |
| 8 | **SEO & Content** | 9 | Technical SEO, Content Strategy, Schema Markup |
| 9 | **Sales & Outbound** | 6 | Cold Email, LinkedIn, Outreach Sequences |
| 10 | **Marketing Strategy** | 9 | Growth, Analytics, Copywriting, Brand |
| 11 | **AI & Machine Learning** | 4 | LLMs, RAG, Fine-tuning, ML Pipelines |
| 12 | **Specialized Domains** | 5 | FinTech, HealthTech, EdTech, Real Estate |
| 13 | **Platform-Specific** | 4 | Shopify, WordPress, Webflow, Bubble |
| 14 | **Testing & Automation** | 3 | E2E Testing, Load Testing, Test Strategy |
| 15 | **Enterprise & Architecture** | 3 | System Design, Migration, Compliance |
| | **TOTAL** | **106** | |

---

# How It Works

<div style="display: flex; gap: 20px; margin: 30px 0;">

<div style="flex: 1; padding: 30px; background: linear-gradient(135deg, #eff6ff, #dbeafe); border-radius: 16px; text-align: center;">
  <div style="font-size: 2.5em; margin-bottom: 10px;">1</div>
  <h3 style="color: #1e40af; margin-bottom: 10px;">Buy</h3>
  <p style="color: #475569;">$50 one-time payment via Stripe. Secure checkout. Instant confirmation.</p>
</div>

<div style="flex: 1; padding: 30px; background: linear-gradient(135deg, #fff7ed, #ffedd5); border-radius: 16px; text-align: center;">
  <div style="font-size: 2.5em; margin-bottom: 10px;">2</div>
  <h3 style="color: #c2410c; margin-bottom: 10px;">Download</h3>
  <p style="color: #475569;">Instant ZIP download. All 106 skills included. No waiting.</p>
</div>

<div style="flex: 1; padding: 30px; background: linear-gradient(135deg, #f0fdf4, #dcfce7); border-radius: 16px; text-align: center;">
  <div style="font-size: 2.5em; margin-bottom: 10px;">3</div>
  <h3 style="color: #15803d; margin-bottom: 10px;">Install</h3>
  <p style="color: #475569;">Unzip to <code>~/.claude/skills/</code> and start using immediately.</p>
</div>

</div>

```bash
# That's literally it:
unzip superskills.zip -d ~/.claude/skills/

# Now in Claude Code:
/nextjs-pro
/supabase-pro
/landing-page-conversion
# ... 103 more skills ready to go
```

---

# Before vs After

```python
import matplotlib.pyplot as plt
import matplotlib.patches as patches

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 9))
fig.patch.set_facecolor('#ffffff')

# --- BEFORE ---
ax1.set_facecolor('#fef2f2')
ax1.set_xlim(0, 10)
ax1.set_ylim(0, 10)
ax1.axis('off')

# Header
header_bg = patches.FancyBboxPatch((0.5, 8.5), 9, 1.2, boxstyle='round,pad=0.15',
                                    facecolor='#ef4444', edgecolor='none')
ax1.add_patch(header_bg)
ax1.text(5, 9.1, 'BEFORE SuperSkills', ha='center', va='center',
         fontsize=18, fontweight='bold', color='white')

before_items = [
    (7.5, '"Build me a Next.js app"'),
    (6.5, '  -> Gets Pages Router (outdated)'),
    (5.5, '  -> No Server Components'),
    (4.5, '  -> Missing caching strategy'),
    (3.5, '  -> Generic folder structure'),
    (2.5, '  -> No TypeScript best practices'),
    (1.5, '  -> You fix everything manually'),
]

for y, text in before_items:
    color = '#991b1b' if text.startswith('  ->') else '#0f172a'
    marker = '' if text.startswith('  ->') else ''
    ax1.text(1, y, text, fontsize=11, color=color, va='center',
             family='monospace', style='italic' if text.startswith('  ->') else 'normal')

# Red X marks
for y in [6.5, 5.5, 4.5, 3.5, 2.5, 1.5]:
    ax1.text(0.5, y, '\u2717', fontsize=14, color='#ef4444', va='center', fontweight='bold')

# --- AFTER ---
ax2.set_facecolor('#f0fdf4')
ax2.set_xlim(0, 10)
ax2.set_ylim(0, 10)
ax2.axis('off')

header_bg2 = patches.FancyBboxPatch((0.5, 8.5), 9, 1.2, boxstyle='round,pad=0.15',
                                     facecolor='#22c55e', edgecolor='none')
ax2.add_patch(header_bg2)
ax2.text(5, 9.1, 'AFTER SuperSkills', ha='center', va='center',
         fontsize=18, fontweight='bold', color='white')

after_items = [
    (7.5, '"/nextjs-pro" + "Build me an app"'),
    (6.5, '  -> App Router with Server Components'),
    (5.5, '  -> Proper streaming & Suspense'),
    (4.5, '  -> Optimized caching strategies'),
    (3.5, '  -> Production folder structure'),
    (2.5, '  -> Strict TypeScript + Zod validation'),
    (1.5, '  -> Ships production-ready code'),
]

for y, text in after_items:
    color = '#15803d' if text.startswith('  ->') else '#0f172a'
    ax2.text(1, y, text, fontsize=11, color=color, va='center',
             family='monospace', style='italic' if text.startswith('  ->') else 'normal')

# Green check marks
for y in [6.5, 5.5, 4.5, 3.5, 2.5, 1.5]:
    ax2.text(0.5, y, '\u2713', fontsize=14, color='#22c55e', va='center', fontweight='bold')

plt.suptitle('The SuperSkills Difference', fontsize=22, fontweight='bold',
             color='#0f172a', y=1.02)
plt.tight_layout(pad=2)
plt.show()
```

---

# Pricing

<div style="text-align: center; padding: 40px; background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%); border-radius: 20px; margin: 20px 0; border: 2px solid #2563eb;">

<h2 style="color: #0f172a; font-size: 2em; margin-bottom: 5px;">One-Time Purchase</h2>

<div style="font-size: 4em; font-weight: 800; color: #2563eb; margin: 20px 0;">$50</div>

<div style="display: flex; justify-content: center; gap: 40px; margin: 30px 0;">
  <div>
    <div style="font-size: 1.8em; font-weight: 700; color: #f97316;">< $0.50</div>
    <div style="color: #64748b;">per skill</div>
  </div>
  <div>
    <div style="font-size: 1.8em; font-weight: 700; color: #22c55e;">1 Year</div>
    <div style="color: #64748b;">free updates</div>
  </div>
  <div>
    <div style="font-size: 1.8em; font-weight: 700; color: #a855f7;">106</div>
    <div style="color: #64748b;">pro skills included</div>
  </div>
</div>

<hr style="border: 1px solid #cbd5e1; width: 60%; margin: 20px auto;">

<p style="color: #475569; font-size: 1.1em;">No subscriptions. No hidden fees. No upsells. Pay once, use forever.</p>

</div>

### ROI Comparison

| Option | Cost | What You Get |
|:---|:---|:---|
| Hire a consultant for 1 hour | ~$150-300 | One framework, one session |
| Build your own skills (106) | ~40-80 hours of work | DIY, no guarantees |
| Online courses (multiple) | $500-2,000 | Learning, not doing |
| **SuperSkills** | **$50 one-time** | **106 expert skills, instant, production-ready** |

```python
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(12, 5))
fig.patch.set_facecolor('#ffffff')

options = ['Consultant\n(1 hour)', 'DIY Build\n(your time)', 'Online\nCourses', 'SuperSkills']
costs = [225, 4000, 1000, 50]  # Consultant avg, 60hrs*~$67 opportunity cost, courses avg
colors_bar = ['#94a3b8', '#94a3b8', '#94a3b8', '#2563eb']
edge_colors = ['#64748b', '#64748b', '#64748b', '#1e40af']

bars = ax.bar(options, costs, color=colors_bar, edgecolor=edge_colors,
              linewidth=1.5, width=0.6, zorder=3)

# Highlight SuperSkills bar
bars[3].set_edgecolor('#f97316')
bars[3].set_linewidth(3)

for bar, cost in zip(bars, costs):
    label = f'${cost:,}' if cost != 4000 else '$4,000+\n(opportunity cost)'
    y_offset = 120 if cost != 4000 else 200
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 50,
            label, ha='center', va='bottom', fontsize=12, fontweight='bold',
            color='#0f172a')

# Arrow pointing to SuperSkills
ax.annotate('Best Value!', xy=(3, 50), xytext=(2.2, 1500),
            fontsize=14, fontweight='bold', color='#f97316',
            arrowprops=dict(arrowstyle='->', color='#f97316', lw=2),
            ha='center')

ax.set_ylabel('Cost ($)', fontsize=12, color='#475569')
ax.set_title('Cost Comparison: Getting Expert-Level AI Assistance', 
             fontsize=15, fontweight='bold', color='#0f172a', pad=15)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color('#e2e8f0')
ax.spines['bottom'].set_color('#e2e8f0')
ax.tick_params(colors='#64748b')
ax.set_facecolor('#f8fafc')
ax.grid(axis='y', alpha=0.3, color='#cbd5e1', zorder=0)
ax.set_ylim(0, 4800)

plt.tight_layout()
plt.show()
```

---

# Tech Stack

<div style="padding: 30px; background: #f8fafc; border-radius: 16px; margin: 20px 0;">

### Built with modern, proven technologies

| Layer | Technology | Purpose |
|:---|:---|:---|
| **Framework** | Next.js 15 (App Router) | SSR, RSC, performance |
| **Styling** | Tailwind CSS v4 | Utility-first, responsive design |
| **Animations** | Framer Motion | Smooth, performant animations |
| **3D Effects** | Three.js | Interactive hero visuals |
| **Payments** | Stripe Checkout | Secure, trusted payments |
| **Hosting** | Vercel | Edge network, instant deploys |
| **Analytics** | Vercel Analytics | Performance monitoring |

</div>

> The SuperSkills landing page itself is built using SuperSkills best practices -- we eat our own dog food.

---

<div style="text-align: center; padding: 60px 40px; background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #1e40af 100%); border-radius: 20px; margin: 20px 0;">
  <h1 style="color: #ffffff; font-size: 2.5em; font-weight: 800; margin-bottom: 15px;">Ready to Supercharge Claude Code?</h1>
  <p style="color: #93c5fd; font-size: 1.3em; margin-bottom: 30px;">106 pro skills. $50 one-time. Instant download.</p>
  <div style="display: inline-block; padding: 15px 50px; background: #f97316; border-radius: 12px; margin: 10px 0;">
    <span style="color: white; font-size: 1.3em; font-weight: 700;">Get SuperSkills Now</span>
  </div>
  <p style="color: rgba(255,255,255,0.5); margin-top: 20px; font-size: 0.9em;">superskills.dev</p>
</div>

