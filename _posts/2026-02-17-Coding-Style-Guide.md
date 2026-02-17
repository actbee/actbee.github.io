
---
layout: post
title: "Coding Style Guideline"
date: 2026-02-17
---

## Coding Style Guideline

This document serves as a comprehensive guideline for developers, outlining best practices and standards for writing high-quality code. The guideline takes a reference from The Art of Readable Code: Simple and Practical Techniques for Writing Better Code (by Dustin Boswell and Trevor Foucher) (https://www.amazon.com/Art-Readable-Code-Practical-Techniques/dp/0596802293)


### The Core Principle
The paramount principle guiding all coding practices is: Code must be easy to understand. The primary objective is to minimize the time required for any developer to comprehend existing code. If this principle conflicts with other guidelines, the ease of understanding takes precedence.

### Part 1: Surface-Level Improvements
#### 1. Meaningful Naming
Effective naming is crucial for code clarity. Names should convey information about their purpose, value, and context.

##### Professional Terminology: 
Choose precise and professional verbs and nouns.
Examples:
send → deliver, dispatch, announce, distribute, route
find → search, extract, locate, recover
start → launch, create, begin, open
make → create, set up, build, generate, compose, add, new

##### Descriptive and Specific: 
Names should describe the variable's purpose or the value it holds. Avoid vague terms like "tmp". Use concrete names instead of abstract ones.
##### Contextual Suffixes/Prefixes: 
Append units to names where applicable (e.g., delay_secs, html_utf8). This is for clarity, not Hungarian notation.
##### Scope-Dependent Length: 
Use shorter names for smaller scopes. For larger scopes, names must be sufficiently informative. Avoid project-specific or obscure acronyms that new team members might not understand (e.g., BackEndManager instead of BEManager).
##### Consistent Formatting: 
Leverage naming conventions to convey meaning. 

CamelCase for class names. 

lower_separated (snake_case) for variable names. 

ALL_CAPS for constants. 

Consider a trailing underscore for class member variables (e.g., offset_) if it enhances clarity in your language/framework.
##### Adhere to Language Conventions: 
Follow established naming conventions for the specific programming language in use. Maintain absolute consistency within the project. 

#### Unambiguous Naming
Names must prevent misinterpretation.

##### Range Delimiters:
Use min_ and max_ prefixes for lower and upper bounds. 

For inclusive ranges[start, end], use first and last. 

For inclusive/exclusive ranges[begin, end), use begin and end. 

##### Boolean Clarity:
Use prefixes like is, has, can, or should to make boolean variables explicit (e.g., is_valid, has_permission). Avoid negative phrasing (e.g., use_ssl is better than disable_ssl as positive phrasing is easier for human cognition).
##### Match Expectations: 
Name operations to reflect their computational cost. Use compute for heavy operations rather than get, which implies a lightweight retrieval. 

#### 3.Code Aesthetics
Visually appealing code is easier to scan and understand.

##### Consistent Layout: 
Employ a consistent indentation, spacing, and bracket style. Consistency is more important than absolute adherence to a specific style if a consistent, project-wide style is already in place. 

##### Visual Similarity: 
Make similar code constructs look similar. 

##### Logical Grouping: 
Group related lines of code into distinct blocks, often separated by blank lines, to form logical paragraphs. 

##### Readability-Driven Formatting:
Strategic Line Breaks: Rearrange lines to maintain consistency and compactness. 

Method Extraction: Refactor irregular or complex segments into well-named methods. 

Column Alignment: Use column alignment for related items (e.g., variable declarations, assignment operators) when it significantly enhances readability, even if it introduces additional whitespace. 

##### Meaningful Order: 
Arrange elements (e.g., declarations, methods) in a logical order (e.g., alphabetical, by importance, by logical grouping). 

#### Effective Commenting
Comments should clarify code, not compensate for its poor quality. Good code > bad code + good comments.

##### When to Comment: 
Add comments when the code's intent is not immediately obvious, or to highlight important caveats and potential pitfalls.
##### What Not to Comment:
Do not comment on facts that are quickly inferable from the code itself. 

Avoid "crutch comments" that attempt to justify or explain poorly written code; instead, improve the code. 

##### Document Intent and Context:
Guiding Annotations: Explain the "why" behind non-obvious design decisions or complex logic. 

Flaw Comments: Use standard tags for known issues: TODO (incomplete), FIXME (broken/non-functional), HACK (suboptimal workaround), XXX (dangerous/critical warning). 

Constants: Comment on constants, explaining their purpose and acceptable modification ranges. 

Reader's Perspective: Anticipate what a reader needs to know. Comment on potential traps (e.g., performance issues with large datasets) or provide a global view (e.g., how classes interact, data flow, entry points). 

Summary Comments: Offer high-level summaries for complex code blocks to aid quick understanding without delving into details. 

##### Concise Comments:
High Information Density: Comments should have a high information-to-space ratio. 

Avoid Ambiguous Pronouns: Use specific code names instead of vague pronouns like "it." 

Refined Language: Polish comment text for clarity and precision. 

Precise Behavior: Accurately describe function behavior. 

Examples: Use input/output examples to illustrate special cases. 

Intent: State the code's intent—what you were thinking when you wrote it. 

Informative Words: Use industry-standard, information-rich terminology. 

Named Parameters: For languages that support it, use named parameters in function calls to improve readability (e.g., f(timeout=1)). 

### Part 2: Simplifying Control Flow and Logic
#### 1. Readable Control Flow
Control flow should be intuitive and easy to trace.

Conditional Argument Order: In if statements, place the varying value on the left and the constant/comparison value on the right (e.g., variable == CONSTANT). 

if/else Block Order: 

Prioritize the normal/expected logic path. 

Handle simpler conditions first. 

Address interesting or potentially problematic conditions first. 

Ternary Operator Caution: While concise, prioritize comprehension time over line count. Avoid complex expressions within ternary operators; if/else might be more explicit. 

Avoid do/while Loops: The condition at the end can make them harder to read and reason about. 

Minimize Nesting: Excessive logical nesting increases cognitive load. Reduce nesting using: 

Early Returns: Return from functions as soon as a condition is met. 

continue in Loops: Use continue to skip iterations and reduce nesting within loops. 

Clarity of Execution Flow: Use advanced control flow mechanisms (e.g., multi-threading, signals, exceptions, anonymous functions, virtual methods) judiciously, as they can obscure the program's execution path. 

#### 2. Breaking Down Overlong Expressions
The human brain typically manages only 3-4 items simultaneously. Long expressions are harder to comprehend.

Introduce Explanatory Variables: Break down complex expressions into smaller, named variables that clarify their intermediate steps.
Example: Instead of if line.split(':')[0].strip() == "root", use val username = line.split(':')[0].strip(); if (username == "root"). 

Summarize Variables: Use boolean variables to encapsulate complex conditions (e.g., val userOwnsDocument = (request.user.id == document.owner_id)). 

De Morgan's Laws: Apply De Morgan's laws to simplify complex logical expressions:
!(A || B || C) <=> (!A && !B && !C)
!(A && B && C) <=> (!A || !B || !C) 

Avoid Overuse of Short-Circuiting: While concise, short-circuit evaluation can sometimes reduce readability. 

Consider the Inverse: Sometimes, simplifying a logical expression is easier by thinking about its logical inverse. 

Extract Repeated Expressions: Replace identical complex expressions with a single, named variable. 

#### 3. Variables and Readability
Careless variable usage significantly hinders program comprehension.

Minimize Variables:
Fewer Variables: Reduce the total number of variables to track. 

Smaller Scope: Limit a variable's scope to the smallest possible code block. 

Less Frequent Changes: Minimize how often a variable's value changes. 

Strategies for Improved Variable Readability:
Reduce Unnecessary Temporaries: Eliminate temporary variables that do not simplify complex expressions, add clarity, or are used only once. 

Reduce Intermediate Results: Avoid storing transient intermediate values that don't serve a clear purpose. 

Reduce Control Flow Variables: Eliminate "flag" variables by utilizing structured programming constructs. 

Define Close to Use: Declare variables as close as possible to their first use. 

"Write Once" Variables: Favor immutable variables (const, final, val) where possible, as their values are constant and easier to reason about. Minimize the number of locations where a variable's value can be modified. 

### Part 3: Code Organization and Design
#### 1. Extract Unrelated Subproblems
Actively extracting unrelated subproblems allows readers to focus on the higher-level goals of the program by abstracting away details.

Self-Contained Logic: Identify self-contained functionalities that are independent of their calling context. 

Pure Utility Code: Extract generic utility functions that can be reused. 

Simplify Interfaces: Create helper functions to simplify interactions with complex APIs or data structures. 

Balance Extraction: Avoid over-extraction; too many small functions can increase cognitive overhead due to frequent jumps between them. 


#### 2. Do One Thing (Single Responsibility Principle)
   Each function, method, or class should have a single, well-defined responsibility.

Task Decomposition: 

List all tasks performed by a given piece of code. 

Decompose these tasks into separate functions, methods, or distinct logical sections within a single function. 

Logical Paragraphing: For complex methods, mentally (or physically with comments/blank lines) divide the code into "logical paragraphs" based on the distinct sub-tasks performed (e.g., variable definition, data processing, state update). 

Introduce Helper Functions: Utilize helper functions to encapsulate sub-tasks, making the main function's purpose clearer. 

#### 3. Translate Ideas into Code
A systematic approach to translating requirements into clear code: 

Natural Language Description: Describe the code's intended functionality in natural language, as if explaining it to a colleague. 

Keyword Identification: Identify key nouns and verbs from your description. 

Code Translation: Write code that directly reflects the identified keywords and the natural language description, minimizing conceptual gaps. 

Leverage Libraries: Familiarize yourself with standard library functions and modules to avoid "reinventing the wheel." 

Recursive Thinking: For problems with self-similar sub-problems, consider recursive solutions. 


#### 4. Write Less Code
The most readable and maintainable code is often the least code.

Avoid Premature Optimization/Features: Do not implement functionality that is not currently required. 

Question Requirements: Challenge and simplify requirements where possible ("reduce scope," "solve simpler problems"). 

Maintain Small Codebases: 

Reusable Utilities: Create and reuse common utility code to reduce duplication. 

Eliminate Dead Code: Regularly remove unused code or features. 

Modularization: Keep projects divided into smaller, manageable sub-projects. 

Code "Weight": Be willing to delete code, even if it represents prior effort, if it is no longer necessary. 

Library Familiarity: Regularly review the functions, modules, and types available in your programming language's standard library and commonly used third-party libraries. 

#### 5. Testability and Readability
Tests are an integral part of the codebase and must also be readable and maintainable.

Descriptive Test Names: Test function names should clearly indicate what is being tested (class, function, scenario/bug). Length is not a concern for test names. 

Helper Functions for Setup: Use auxiliary functions to abstract away unimportant setup details (e.g., object builders, data generators). 

Readable Error Messages: Test failures should provide clear, actionable error messages. 

Simple Test Values: Use the simplest possible test values that adequately cover the purpose and boundary conditions of the test. 

Test-Driven Development (TDD): Employing TDD encourages writing better-designed, more testable code. Highly decoupled code is inherently easier to test. 

Avoid Over-Testing: 

Do not compromise the readability of production code solely for testability. 

Avoid obsessing over 100% test coverage, especially when the last few percentage points require disproportionate effort for rarely occurring edge cases. 

Tests should facilitate, not impede, product development. 

Characteristics of Highly Testable Code: 

Minimal Internal State: Easier to test and reason about. 

Single Responsibility: Requires fewer test cases, promotes modularity and low coupling. 

Low Dependencies: Allows independent testing and parallel development. 

Simple, Clear Interfaces: Leads to unambiguous behavioral tests and high reusability. 

