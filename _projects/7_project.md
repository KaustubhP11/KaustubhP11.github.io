---
layout: page
title:  Weight-Shared Networks
description: A study of methods enabling scalable and dynamic neural networks for diverse deployment.
img: assets/img/Eff_inf.jpg
importance: 7
category: Ongoing
---

## What Are Weight-Shared Networks?

Weight-shared networks allow a single model to dynamically support multiple configurations (e.g., varying depths, widths, and layers) for diverse deployment scenarios. By leveraging shared parameters, these networks enable scalable and efficient inference without requiring repeated retraining for different resource or performance constraints.

This approach is particularly impactful for deploying large models like GPT, LLaMA, or FLEXTRON on resource-constrained devices, such as mobile phones or edge hardware.

---

## How Do Weight-Shared Networks Work?

Weight-shared networks train a "supermodel" capable of generating sub-networks tailored to specific hardware or application needs. These sub-networks are derived using:

- **Subnet Selection Strategies:** Dynamic programming for layer selection and importance-based pruning for neuron selection.
- **Elastic Architectures:** Adapt depth, width, and resolution to achieve optimal performance within given constraints.
- **Dynamic Runtime Inference:** Select sub-networks at runtime based on hardware or input requirements.

These methods ensure high adaptability and efficiency, enabling instant deployment of models optimized for accuracy and latency.

---

## Key Techniques

### 1. **AmoebaLLM: Knowledge-Preserving Subnet Selection**
- Uses **dynamic programming** to identify critical layers while maintaining the knowledge of pre-trained LLMs.
- Employs **importance-driven metrics** for structured neuron pruning, preserving key features for inference.

### 2. **Once-for-All (OFA): Progressive Shrinking**
- Trains the largest configuration first and progressively fine-tunes smaller sub-networks.
- Supports dynamic adaptation of depth, width, and resolution during inference.

### 3. **FLEXTRON: Elastic and Input-Adaptive Routing**
- Introduces **elastic MLPs** and multi-head attention layers to dynamically scale resources based on input complexity.
- Employs a surrogate model for stable routing decisions, ensuring efficient and accurate sub-network selection.
- Supports both static and dynamic routing mechanisms to optimize for varying hardware and latency constraints.

### 4. **Shape-Aware Mixture of LoRAs (SMoL)**
- Introduces modular adapters activated based on sub-network shapes to mitigate gradient conflicts during fine-tuning.
- Enables efficient merging of selected configurations into the model weights at deployment.

---

## Benchmarks and Performance

Weight-shared networks have shown significant improvements in efficiency and scalability. For example:

- **AmoebaLLM:** Outperforms state-of-the-art (SOTA) LLM compression methods in accuracy-efficiency trade-offs.
- **FLEXTRON:** Achieves dynamic scaling for transformer architectures, enabling both token-specific and hardware-adaptive optimizations.
- **OFA:** Achieves high ImageNet accuracy while operating efficiently across diverse hardware platforms.

### Example Trade-Off:
| Subnet Configuration | Accuracy (%) | Latency (s) |
|-----------------------|--------------|-------------|
| Full Model           | 85.2         | 1.50        |
| Reduced Depth/Width  | 82.3         | 0.90        |
| Optimized Subnet     | 83.5         | 0.95        |

---

## Applications

### Real-World Use Cases:
- **Edge AI:** Deploying efficient LLMs on resource-constrained devices like NVIDIA Jetson or mobile GPUs.
- **Dynamic Model Scaling:** Adjusting model size dynamically based on real-time hardware constraints.
- **Energy-Efficient AI:** Reducing computational overhead for sustainability-focused AI solutions.

---

## Challenges and Future Directions

1. **Gradient Conflicts:** Addressing conflicts during multi-subnetwork fine-tuning.
2. **Scalability:** Extending weight-shared strategies to future LLM architectures.
3. **Robustness:** Ensuring reliability across diverse tasks and hardware.

---

## Explore More

- **Codebase:** [AmoebaLLM GitHub Repository](https://github.com/GATECH-EIC/AmoebaLLM)
- **Related Works:** [Once-for-All Network](https://arxiv.org/abs/1908.09791), [FLEXTRON Paper](https://arxiv.org/abs/2406.10260)
