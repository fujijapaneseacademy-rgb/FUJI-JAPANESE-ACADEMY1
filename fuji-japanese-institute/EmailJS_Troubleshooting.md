# EmailJS Troubleshooting Guide

It looks like you are experiencing issues with data not showing up in your emails. This is usually caused by a mismatch between the **React Code** and the **EmailJS Dashboard Template**.

## 🚨 The Problem

You are likely seeing `${data.name}` or similar text in your received emails.

1. **Syntax Mismatch**: You are using JavaScript syntax (`${data.name}`) in the EmailJS dashboard. EmailJS uses **Handlebars** syntax (`{{data.name}}` or `{{name}}`).
2. **Missing Data**: Previously, the `data` object was not being sent to EmailJS, so even if you fixed the syntax, the variables would be empty.

## ✅ The Fixes

 I have updated your code to send all necessary data to EmailJS. Now you just need to update your template in the **EmailJS Dashboard**.

### Option 1: Use the Pre-built HTML (Recommended)

This is the easiest method and ensures your emails look exactly like the beautiful templates defined in your code (`services/emailTemplates.ts`).

1. Go to your [EmailJS Dashboard](https://dashboard.emailjs.com/admin).
2. Open your **Email Template**.
3. **Delete everything** in the email body.
4. Paste exactly this:

    ```handlebars
    {{{content_html}}}
    ```

    *(Note the TRIPLE curly braces. This tells EmailJS to render the implementation as HTML, not text.)*
5. Save the template.

---

### Option 2: Custom Template in Dashboard

If you prefer to design the email inside the EmailJS dashboard, you must use the correct syntax.

1. Go to your **Email Template** in the dashboard.
2. Change all `${data.variable}` to `{{data.variable}}` or just `{{variable}}`.

**Example:**

**❌ DON'T Do This:**

```text
Name: ${data.name}
Email: ${data.email}
```

**✅ DO This:**

```handlebars
Name: {{name}}
Email: {{email}}
```

*OR*

```handlebars
Name: {{data.name}}
Email: {{data.email}}
```

## Summary of Data Available to EmailJS

The following variables are now sent to your template:

- `{{name}}` / `{{data.name}}`
- `{{email}}` / `{{data.email}}`
- `{{phone}}` / `{{data.phone}}`
- `{{course}}` / `{{data.course}}`
- `{{message}}` / `{{data.message}}`
- `{{formType}}` / `{{data.formType}}`

If you have any further issues, please let me know!
