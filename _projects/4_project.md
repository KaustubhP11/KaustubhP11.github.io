---
layout: page
title: StructFormer
description: Document Structure-Based Pre-training
img: assets/img/Structformer-img.jpg
importance: 4
category: Completed
related_publications: true
---

## Abstract

Most state-of-the-art techniques for Language Models (LMs) today rely on transformer-based architectures and their ubiquitous attention mechanism. However, the exponential growth in computational requirements with longer input sequences confines Transformers to handling short passages. Recent efforts have aimed to address this limitation by introducing selective attention mechanisms, notably local and global attention. While sparse attention mechanisms, akin to full attention in being Turing-complete, have been theoretically established, their practical impact on pre-training remains unexplored. This study focuses on empirically assessing the influence of global attention on BERT pre-training. The primary steps involve creating an extensive corpus of structure-aware text through arXiv data, alongside a text-only counterpart. We carry out pre-training on these two datasets, investigate shifts in attention patterns, and assess their implications for downstream tasks. Our analysis underscores the significance of incorporating document structure into LM models, demonstrating their capacity to excel in more abstract tasks, such as document understanding.



<div class="row">
   <div class="col-sm mt-3 mt-md-0">
       {% include figure.liquid path="assets/img/Structformer-overview-pic.jpg" title="StructFormer Overview" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="600px" %}
   </div>
</div>
<div class="caption">
   Overview of StructFormer showing our approach to empirically analyzing masked attention during pre-training. We process arXiv documents to create parallel corpora - one with only text and another that is structure-aware. These are used to pre-train and analyze models, evaluating their performance on downstream tasks.
</div>

StructFormer introduces a novel approach to help language models better understand document structure during pre-training. By incorporating document headers as global attention tokens, the model learns to recognize and utilize document organization for improved comprehension.

## The Challenge

Modern language models face two key limitations when processing long documents:

1. Computational constraints with increasing sequence length
2. Limited understanding of document structure and organization

While sparse attention mechanisms help address the first issue, existing approaches typically ignore document structure during pre-training, only utilizing it during fine-tuning.

## Our Approach & Results

<div class="row">
   <div class="col-sm mt-3 mt-md-0">
       {% include figure.liquid path="assets/img/Final_att.png" title="Attention Patterns" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="600px"  %}
   </div>
</div>
<div class="caption">
   Attention patterns comparing structure-aware pre-training (left) versus vanilla pre-training (right) between header and keywords. The structure-aware model shows stronger attention relationships between document headers and relevant content.
</div>

StructFormer modifies the pre-training process to make models inherently structure-aware through:

- Document headers as global attention tokens during pre-training
- Combined local and global attention mechanisms
- Structure-aware training data from LaTeX documents
- Sparse attention patterns for efficiency

## Results & Analysis

### SciREX Performance (End-to-end predicted input)

| Task | Model | Precision | Recall | F1 |
|------|-------|-----------|--------|----| 
| Salient Clusters | StructFormer | 0.2581 | 0.6127 | 0.3419 |
| | SciREX Baseline | 0.2230 | 0.6000 | 0.3070 |
| Binary Relations | StructFormer | 0.0550 | 0.5100 | 0.0890 |
| | SciREX Baseline | 0.0650 | 0.4110 | 0.0960 |
| 4-ary Relations | StructFormer | 0.0019 | 0.2760 | 0.0037 |
| | SciREX Baseline | 0.0070 | 0.1730 | 0.0080 |

### GLUE Benchmark Results

| Task | Metric | Vanilla Longformer | StructFormer | BERT base |
|------|--------|-------------------|--------------|-----------|
| CoLA | Mathews Correlation | 0.502 | 0.469 | 0.521 |
| STSB | Combined Score | 0.871 | 0.856 | 0.858 |
| MRPC | F1 | 0.904 | 0.927 | 0.900 |
| QNLI | Accuracy | 0.908 | 0.910 | 0.905 |
| SST2 | Accuracy | 0.928 | 0.933 | 0.935 |
| MNLI | Accuracy | 0.867 | 0.870 | 0.833 |

The results demonstrate StructFormer's superior performance in document understanding tasks, particularly in salient cluster identification where it outperforms the baseline by ~3.5 percentage points. On GLUE tasks, StructFormer maintains competitive performance with BERT base while excelling in tasks like MRPC and QNLI, showing its structure-awareness doesn't compromise general language understanding capabilities.

## Pipeline Implementation

<div class="row">
   <div class="col-sm mt-3 mt-md-0">
       {% include figure.liquid path="assets/img/SciREX-predicted.png" title="SciREX Pipeline" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="600px" %}
   </div>
</div>
<div class="caption">
   SciREX pipeline integrated with our structure-aware corpus pre-trained Longformer, showing the complete workflow from input processing to final predictions.
</div>

The implementation involves:

1. Processing 1.1M+ LaTeX documents from arXiv
2. Combining local windowed attention with global attention for headers
3. Using headers as global attention tokens during pre-training
4. Fine-tuning on downstream tasks while maintaining structural awareness

## Resources

- [Paper](https://arxiv.org/abs/2411.16618)
- [GitHub Repository](https://github.com/KaustubhP11/StructFormer)
- [Dataset Information](https://arxiv.org/)