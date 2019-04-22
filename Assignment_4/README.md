<h3>Instructions</h3>
1. You are going to use 'tween-plane.js' as a model to animate the heart beating problem. I uploaded these models on Sakai.
2. name your javascript as 'your-sakai_id_heart-tween.js'
3. to test make sure use the tween-plane.html and by including your javascript.
4. it will have one control to change the heart-beat from 60 bps to 170 bps.
5. To turn in, just send me your completed  javascript file.
<h4>Hints and Tips</h4>
1. create a function called tween_control(animation_time) and put all of your tween animation configuration here.
2. you will call this function from 2 different place:
3. call it just before the render() loop function (call it with value init_time=600)
4. call it from onChange() from dat.GUI control when you change the heart rate.
5. in the onChange() function of the dat.GUI, you call tween_control(heart_rate) where heart_rate is computed as follows: 60*init_time/(value bound to dat.GUI control variable you setup).
6. you are tweening between 1 and 1.1 (10%) and you will use these values from the TWEEN object to scale the heart between 100% (normal scale) and 110% (mimics heart beat). You will scale in the render loop.
<h4>Objectives </h4>
Learn how to use tween.js library for simple animation.