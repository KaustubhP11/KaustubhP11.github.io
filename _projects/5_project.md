---
layout: page
title: GuideQ
description: Framework for Guided Questioning in Information Collection
img: assets/img/GuideQ-img.jpg
importance: 5
category: Completed
related_publications: true
---

## Abstract

Question Answering (QA) is an important part of tasks like text classification through information gathering. These are finding increasing use in sectors like healthcare, customer support, legal services, etc., to collect and classify responses into actionable categories. LLMs, although can support QA systems, they face a significant challenge of insufficient or missing information for classification. Although LLMs excel in reasoning, the models rely on their parametric knowledge to answer. However, questioning the user requires domain-specific information aiding to collect accurate information. Our work, GUIDEQ, presents a novel framework for asking guided questions to further progress a partial information. We leverage the explainability derived from the classifier model for along with LLMs for asking guided questions to further enhance the information. This further information helps in more accurate classification of a text. GUIDEQ derives the most significant key-words representative of a label using occlusions. We develop GUIDEQ's prompting strategy for guided questions based on the top-3 classifier label outputs and the significant words, to seek specific and relevant information, and classify in a targeted manner. Through our experimental results, we demonstrate that GUIDEQ outperforms other LLM-based baselines, yielding improved F1-Score through the accurate collection of relevant further information. We perform various analytical studies and also report better question quality compared to our method.


<div class="row">
   <div class="col-sm mt-3 mt-md-0">
       {% include figure.liquid
        path="assets/img/figure-2.png" title="GuideQ Overview" class="img-fluid rounded z-depth-1 w-75 mx-auto d-block" %}
   </div>
</div>
<div class="caption">
   Overview of GuideQ's process for generating guided questions by combining classifier explainability with LLMs.
</div>

GuideQ introduces a novel framework for progressive information collection through guided questioning, helping to classify user responses more accurately by identifying and requesting missing critical information.

## Key Components

1. **Classification Model**: Uses BERT/DeBERTa to map inputs to labels
2. **Keyword Learning**: Identifies significant words per label using occlusion techniques
3. **Question Generation**: Leverages LLaMA-3 8B model to generate targeted questions

## Results & Analysis

### Classification Performance

| Task | Model | Precision | Recall | F1 |
|------|-------|-----------|--------|----| 
| CNEWS | GuideQ | 0.603 | 0.495 | 49.6 |
| DBP | GuideQ | 0.932 | 0.912 | 91.3 |
| S2D | GuideQ | 0.793 | 0.806 | 86.8 |
| SALAD | GuideQ | 0.627 | 0.591 | 58.7 |

<div class="row">
   <div class="col-sm mt-3 mt-md-0">
       {% include figure.liquid path="assets/img/multiturn.png" title="Multi-turn Results" class="img-fluid rounded z-depth-1 w-75 mx-auto d-block" %}
   </div>
</div>
<div class="caption">
   Multi-turn interaction results showing F1-scores across three turns of question-answering on CNEWS dataset.
</div>

## Technical Highlights

- Uses LLaMA-3 8B for question generation
- Leverages occlusion-based keyword extraction
- Combines top-3 predicted labels with keyword information
- Supports multi-turn interactions for progressive information gathering

## Resources

- [Paper](https://arxiv.org/abs/2411.05991)
- [Code](https://github.com/SDRMp/DRPG)