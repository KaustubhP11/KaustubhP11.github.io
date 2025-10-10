---
layout: none
permalink: /cv/
title: CV
nav: true
nav_order: 5
cv_pdf: Kaustubh_New_CV_1pg.pdf
description: Updated January 2025
---

<script>
  // Redirect to PDF directly
  window.location.href = "{{ page.cv_pdf | prepend: 'assets/pdf/' | relative_url }}";
</script>

<meta http-equiv="refresh" content="0; url={{ page.cv_pdf | prepend: 'assets/pdf/' | relative_url }}">

<p>If you are not redirected automatically, <a href="{{ page.cv_pdf | prepend: 'assets/pdf/' | relative_url }}">click here</a> to view the PDF.</p>
