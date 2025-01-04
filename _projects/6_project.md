---
layout: page
title: Memorization in LLMs
description: A review of recent methods
img: assets/img/Mem_pic.jpg
importance: 6
category: Ongoing
---
## What is Memorization in LLMs?

Memorization in large language models (LLMs) refers to the phenomenon where models retain and reproduce specific data from their training sets, often verbatim. This behavior becomes particularly concerning when it involves sensitive or identifiable information, such as names, phone numbers, or addresses, as highlighted in studies like Carlini et al. (2021). Memorization typically manifests in two forms: verbatim reproduction of long sequences and retention of specific information, which raises risks for privacy, security, and ethical compliance. It is primarily detected through extraction attacks, where models are prompted with prefixes from the training data to observe whether they regenerate exact continuations. Such methods provide a basis to distinguish memorization from general language understanding.

Understanding why LLMs memorize requires examining their training dynamics and design. At its core, memorization results from a combination of factors, including data duplication, model size, and the inherent objective to predict tokens accurately. Larger models, due to their capacity, are particularly prone to storing rare or unique sequences. Data duplication exacerbates this by amplifying the statistical emphasis on repeated content, increasing its likelihood of being memorized. Studies, like Nanda et al. (2023), further reveal that memorization evolves through distinct phases during training. Early on, models exhibit high memorization with low generalization, but as training progresses, they may transition to broader generalization patterns, though rare sequences often remain memorized.


<div class="row">
   <div class="col-sm mt-3 mt-md-0">
       {% include figure.liquid
        path="assets/img/quant_mem.png" title="Degree of Memorization" class="img-fluid rounded z-depth-1 w-75 mx-auto d-block" %}
   </div>
</div>
<div class="caption">
   Variation of amount of memorized content with model size, data duplication and through training phase.
</div>

This dual nature of memorization—critical for factual accuracy but potentially harmful—presents significant challenges. It is particularly pronounced in fine-tuning, where smaller datasets and task-specific optimization increase the risk of overfitting and retention of fine-tuning examples. Addressing these issues requires effective detection and mitigation strategies that strike a balance between maintaining utility and reducing harmful memorization. Developing robust metrics and techniques to assess memorization remains an active area of research.

---

## How and Why Do LLMs Memorize?

Memorization in large language models (LLMs) has been a focal point of extensive research, with early works such as Carlini et al. (2021) demonstrating how sensitive information can be extracted from pre-trained models using targeted attacks. These studies revealed that even advanced models like GPT-2 could regurgitate personal details, including names, email addresses, and phone numbers, emphasizing the privacy risks posed by memorization. Later, Carlini et al. (2022) extended this understanding by introducing metrics such as k-eidetic memorization and counterfactual memorization, which measure the extent to which models reproduce unique sequences or specific data points. They also showed that larger models tend to memorize more data, a trend driven by their increased capacity to store and reproduce long sequences.



The underlying causes of memorization have also been explored, identifying the pivotal roles of data duplication and repeated exposure to rare sequences. Training datasets with high duplication rates disproportionately emphasize specific data points, significantly increasing the likelihood of memorization. Fine-tuning, particularly on small datasets, further exacerbates this issue, as shown by Mireshghallah et al. (2022), which observed pronounced overfitting in fine-tuned models. Research by Nanda et al. (2023) provides deeper insights into training dynamics, showing that memorization and generalization follow distinct phases: models initially exhibit high memorization with limited generalization but later transition to broader generalization patterns, though rare sequences often remain memorized. Collectively, these works have enriched the understanding of why and how memorization occurs in LLMs, offering valuable guidance for developing strategies to mitigate its risks while preserving model utility.

## Quantifying Memorization in Large Language Models

### Verbatim and Eidetic Memorization
Carlini et al. provide significant insights into the phenomenon of memorization in large language models (LLMs), particularly focusing on the risks it poses to privacy. Their work defines two key forms of memorization.

**Definition 1: Verbatim Memorization**  
Verbatim memorization refers to instances where an LLM reproduces exact sequences from its training data when prompted. This poses risks when sensitive or private information is memorized and exposed.

**Definition 2: \(k\)-Eidetic Memorization**  
A string is \(k\)-eidetic memorized if it can be extracted from the model and appears in at most \(k\) distinct training examples. This highlights the vulnerability of unique or rare data in the training set.

Carlini et al. demonstrate that memorization increases with model size, data duplication, and prompt length. Larger models memorize more, and repeated sequences in the training set are significantly more likely to be extracted. Additionally, longer prompts make it easier to uncover memorized content, increasing the risks of sensitive data exposure.

These findings emphasize the need for mitigation strategies such as training dataset deduplication and differential privacy techniques to limit memorization and reduce privacy risks.
<div class="row">
   <div class="col-sm mt-3 mt-md-0">
       {% include figure.liquid
        path="assets/img/attack_pipe.png" title="Workflow of extraction attack and evaluation. " class="img-fluid rounded z-depth-1 w-75 mx-auto d-block" %}
   </div>
</div>
<div class="caption">

Attack. We begin by generating many samples from GPT-2
when the model is conditioned on (potentially empty) prefixes. We then sort each generation according to one of six metrics and
remove the duplicates. This gives us a set of potentially memorized training examples.

Evaluation. We manually inspect
100 of the top-1000 generations for each metric. We mark each generation as either memorized or not-memorized by manually
searching online, and we confirm these findings by working with OpenAI to query the original training data.
</div>
---

### Counterfactual Memorization
Building on previous work, the concept of **counterfactual memorization** introduces a new perspective to study memorization in LLMs. Unlike traditional definitions that focus on identifying overlaps between training data and model outputs, counterfactual memorization quantifies the dependence of a model’s predictions on specific training examples.

**Definition 3: Counterfactual Memorization**  
A training example \(x\) is counterfactually memorized if the model’s ability to predict \(x\) is significantly reduced when \(x\) is omitted from the training data. This is quantified as the difference in the model’s performance on \(x\) with and without \(x\) in the training set.

This framework addresses limitations of earlier definitions by filtering out "common" memorized data, such as repeated or template-like phrases, and highlighting examples that uniquely influence the model. Counterfactual memorization systematically lowers scores for frequently duplicated examples, focusing instead on rare and impactful data.

The study shows that rare examples with fewer duplicates have higher counterfactual memorization scores. These examples often carry unique or sensitive information, making them critical from a privacy perspective. Additionally, this framework provides a basis for understanding how specific training data influences model outputs, both during evaluation and generation.

Counterfactual memorization enhances our ability to identify privacy risks by focusing on isolated cases of memorization. It highlights the importance of data deduplication and careful dataset construction to mitigate the risks associated with memorizing sensitive or unique information.

---

### Adversarial Compression and Memorization
The concept of **adversarial compression** redefines how memorization in LLMs can be assessed, emphasizing a compression-based metric. This approach highlights the relationship between input prompt length and the output it elicits, offering a novel way to evaluate whether a model has memorized specific training data.

**Definition 4: Adversarial Compression Ratio (ACR)**  
A training example \(x\) is considered memorized if the minimal prompt \(p\) that elicits \(x\) is significantly shorter than \(x\) itself. The **Adversarial Compression Ratio** is defined as:


<p align="center">
<b> ACR(M, \(x\)) = Length of \(x\) / Length of minimal prompt \(p\) </b>
</p>

An \(x\) is memorized if \(ACR(M, x) > 1\), indicating that the model can "compress" \(x\) within its learned weights.

This definition introduces an adversarial perspective to measuring memorization, focusing on whether a model can reproduce data with a highly compressed prompt. It shifts attention from exact reproduction to assessing the underlying storage of information in a model’s weights.

<div class="row">
   <div class="col-sm mt-3 mt-md-0">
       {% include figure.liquid
        path="assets/img/ACR_mem.png" title="e Adversarial Compression Ratio based Memorization. " class="img-fluid rounded z-depth-1 w-75 mx-auto d-block" %}
   </div>
</div>
<div class="caption">

We propose a compression ratio where we compare the length of the shortest prompt that
elicits a training sample in response from an LLM to the length of that sample. If a string in the
training data can be compressed, i.e. the minimal prompt is shorter than the sample, then we call it
memorized. Our test is an easy-to-describe tool that is useful in the effort to gauge the misuse of data.

</div>

The study demonstrates that adversarial compression is robust against simple evasion strategies like in-context unlearning, where a model is instructed to refrain from reproducing certain outputs. Even when such defenses are applied, adversarially optimized prompts can still elicit memorized outputs, indicating that the memorized data remains encoded in the model.

By offering a practical and computationally efficient framework, adversarial compression expands the tools available for evaluating memorization. This approach also provides insights into compliance with data usage regulations, helping distinguish between genuinely forgotten data and cases of superficial compliance.

