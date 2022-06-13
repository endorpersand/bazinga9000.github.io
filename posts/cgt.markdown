---
title: CGT Hub
kochtitle: On Combinatorial Game Theory
goto: /index.html
katex: on
extracss: cgt
---
-----------

<center>"Games lubricate the body and the mind."</center>
<center>—*Benjamin Franklin*</center>

-----------

Hello!

This is a series that will attempt to go through the field of Combinatorial Game Theory in depth, requiring as little mathematical background as possible. If you've watched the [Hackenbush video](https://www.youtube.com/watch?v=ZYj4NkeGPdM), you know how deep this rabbit hole goes. This series will follow a similar path to that video, but will be more thorough.

That video and this series are both based on the four-volume series *Winning Ways for your Mathematical Plays* by Conway, Berlekamp, and Guy. Readers among you who have already read these texts should still stick around, of course. In my time reading through that book, as amazing an introduction as it may be, I've felt at times that it went a bit fast. This series will try not to go too quick for its own good.

Another note for readers of *Winning Ways*: There are some bits of convention in that book that I'm ignoring because I don't like them. If you haven't read or don't want to read the books, you can safely skip over this bit. A list of such is as follows, and may be expanded as the series progresses:

* *Winning Ways* often expresses sums using concatenation, for example writing $\ast\uparrow$ to represent $\ast \: + \uparrow$. This series will not do that for clarity, always expressing sums using the plus sign.

* The distinction between the terms "game" and "position" in *Winning Ways* is very vague, as the books often use "game" to refer to a position within a game. In this series, the term "game" will exclusively refer to entire games, such as Hackenbush, whereas "position" will refer only to individual game states.

I also have some people to thank. Some of these people have made other texts and resources that are helpful to me as I write this and will likely be helpful to you in turn if you wish to go further than I have taught you:

<details>
<summary>**Acknowledgements**</summary>
-----------

An extremely large thank you goes out to the writers of a handful of very very comprehensive and useful texts:

* **Conway, Berlekamp, and Guy**, the authors of *Winning Ways for your Mathematical Plays*, the text which founded the field.
    
* **Conway** (again), the author of *On Numbers and Games*, which also founded the field.
    
* **Albert, Nowakowski, and Wolfe**, the authors of *Lessons in Play: An Introduction to Combinatorial Game Theory*, which had many examples not seen in other texts and helped me reinforce my knowledge.
    
* **Siegel**, the author of the AMS' *Graduate Studies in Mathematics Volume 146: Combinatorial Game Theory*, a modern overview of the entire field (it even has a list of open problems!)
    
* **Siegel** (again), the creator of [CGSuite](http://www.cgsuite.org), a most helpful Computer Algebra System that lets me, to put it simply, fuck around and find out about games.
    
* **Owen Maitzen**, creator of the [Hackenbush video](https://www.youtube.com/watch?v=ZYj4NkeGPdM) which showed me just how wild this field is and started me down this path.

I also have some other thanks to give to people who have not written any texts or made any videos on CGT, but have been influential nonetheless:

* **The Invisible Rabbit Hole**, for looking over my proofs with a fine-toothed comb and being extremely enthusiastic about this project.
    
* **The UMD Math Lounge**, for convincing me to give a talk on this which led to me creating this as one method of preparation. And also for putting up with my constant jokes about the Sprague-Grundy Theorem.

And, of course, no matter how cheesy it may sound:

* **You**, for reading this. One of the many reasons I am making this is because I want to show people how cool this field is. If you're here reading this, that means I have (hopefully) succeeded.

</details>


With that out of the way, let's get to it!
