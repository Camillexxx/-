alert("请确认是否开始游戏");
const bookPages=[
    {type:"text",content:"<h1>【干叶上瘾者(1/3)】</h1><p>怪物名称：干叶上瘾者（流民）</p><p>特点：低级的流民在无法得到低浓度的香水之后，渐渐枯萎，但在彻底凋谢之前，这些得不到香水缓解枯萎的流民们首先会陷入香水瘾发作的疯狂，这种疯狂让他们幻想自己无所不能</p><p>弱点：？？？（待探索）</p><p>攻击方式：盗窃玫瑰（A+）,用触须攻击采花工以窃取对方的劳动成果</p>"},
    {type:"text",content:"<h2>【糜烂员工(2/3)】</h2><p>怪物名称：糜烂员工（加工员，厂工及调香师）</p><p>特点：适应了低浓度玫瑰香水的上流人士们很快无法从低浓度的香气里获得满足，他们不得不在使用浓度越来越高的玫瑰香水</p><p>弱点：？？？（待探索）</p><p>攻击方式：玫瑰碎纸（A+）,用节肢攻击对方</p>"},
    {type:"text",content:"<h3>糜烂员工</h3><p>弱点：右眼</p><p>攻击方式：香气诱导(S-),用香气引诱对方并且加以吞噬</p>"},
    {type:"image",content:"怪物书第三页.jpg"},
];

let currentPage=0;

function openBook(){
    document.getElementById('monsterBookModal').style.display='flex';
    showPage(currentPage);
}

function closePage(){
    document.getElementById('monsterBookModal').style.display='none';
}

function showPage(index){
    const page=bookPages[index];
    const bookPage=document.getElementById('bookPage');
    bookPage.innerHTML="";
    bookPage.style.backgroundImage="";
    if (page.type==='text'){
        bookPage.innerHTML=page.content;
        bookPage.style.fontSize="20px";
        bookPage.style.backgroundImage="玫瑰工厂怪物书背景图.jpg";
        bookPage.style.backgroundSize="cover";
        bookPage.style.backgroundPosition="center";
    } else if (page.type==='image') {
        bookPage.innerHTML="";
        bookPage.style.backgroundImage=`url('${page.content}')`;
        bookPage.style.backgroundSize="cover";
        bookPage.style.backgroundPosition="center";
        bookPage.style.opacity="1";
    }
}

function prevPage(){
    if (currentPage>0){
        currentPage--;
        showPage(currentPage);
    }
}

function nextPage(){
    if (currentPage<bookPages.length-1){
        currentPage++;
        showPage(currentPage);
    }
}

const monsterBookModal = document.getElementById('monsterBookModal');
if (monsterBookModal) {
    monsterBookModal.onclick = function(e) {
        // 你的弹窗关闭逻辑
        document.getElementById('monsterBookModal').onclick=function(e){
    //如果点击的是弹窗本身（背景）就关闭弹窗
    if (e.target===this){
        closePage();
    }
        };
    };
}

//怪物书菜单点击 -找出html中所有包含“怪物书”字样的网页 并在点击怪物书时保证不会跳转到网页链接a中去
document.querySelectorAll('a').forEach(function(a){
    if (a.textContent.includes('怪物书')) {
        a.onclick=function(e){
            e.preventDefault();
            openBook();
        }
    }
});


// 显示 blocks
document.getElementById('key-item-nav').onclick = function(e) {
    e.preventDefault();
    document.querySelectorAll('.block').forEach(function(block){
        block.classList.add('active');
    });
    e.stopPropagation(); // 阻止冒泡，防止立即关闭
};

// 点击除关键道具以外区域关闭 blocks
document.body.addEventListener('click', function() {
    document.querySelectorAll('.block').forEach(function(block){
        block.classList.remove('active');
    });
});

// 阻止点击关键道具时关闭 blocks
document.getElementById('key-item-nav').addEventListener('click', function(e){
    e.stopPropagation();
});

document.getElementById('game-modal').onclick=function(e) {
    if (e.target===this) {
        document.getElementById('game-modal').style.display='none';
    }
}

function typeWriterEffect(textArr,element,speed=60) {
    element.innerHTML="";
    let line=0;
    let char=0;
    function type() {
        if (line<textArr.length) {
            if (char<textArr[line].length) {
                element.innerHTML+=textArr[line].charAt(char);//charAt() 方法可返回指定位置的字符 某句的某个字！
                char++;
                setTimeout(type,speed);
            } else {
                element.innerHTML+='<br>';//换行
                line++;
                char=0;
                setTimeout(type,speed);
            }
        }
    }
    type();//调用type函数，开始打字
}


document.getElementById('game-introduction').onclick=function() {
    const modal=document.getElementById('game-modal');//点击游戏介绍 后 使弹窗显示出来
    const modalContent=document.querySelector('.game-modal-content');
    const textArr=[
        "等级：三级（玩家死亡率大于80%小于90%）",
        "模式：多人模式（0/6）"
    ];
    modal.style.display='flex';
    typeWriterEffect(textArr,modalContent,60);
};

const rewardPages=[
    "奖励综合评定：<br>true end线通关：积分奖励300000 <br>true end线通关：属性点500",
    "小电视综合评定：<br>黄金皇冠徽章级别视频",
    "小电视成就：<br>国王排行榜第一位 <br>第十七个获得千万级别数据小电视的玩家"
];

let rewardIndex=0;
let rewardTimer=null;

function showRewardPage(index) {
    const content=document.getElementById('reward-content');
    content.innerHTML=rewardPages[index];
    if (rewardTimer) clearTimeout(rewardTimer);
    if (index<rewardPages.length-1) {
        rewardTimer=setTimeout(()=> {
            showRewardPage(index+1);
        },5000);//每两秒切换一次
    }
}

document.getElementById('reward-link').onclick=function(e) {
    e.preventDefault();
    document.getElementById('reward-modal').style.display='flex';
    rewardIndex=0;
    showRewardPage(rewardIndex);
    launchFireworks();
};

// 点击弹窗关闭
document.getElementById('reward-modal').onclick = function(e) {
    if (e.target === this) {
        this.style.display = 'none';
        if (rewardTimer) clearTimeout(rewardTimer);
        stopFireworks();
    }
};

// 简易赛博烟花动画
function launchFireworks() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    const ctx = canvas.getContext('2d');
    document.getElementById('reward-fireworks').innerHTML = '';
    document.getElementById('reward-fireworks').appendChild(canvas);

    let fireworks = [];
    let running = true;

    function randomColor() {
        return `hsl(${Math.random()*360},100%,60%)`;
    }

    function Firework() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random() * canvas.height * 0.5 + 100; // 爆炸高度更合理
    this.color = randomColor();
    this.radius = 5;
    this.exploded = false;
    this.particles = [];
}

// ...existing code...

Firework.prototype.update = function() {
    if (!this.exploded) {
        this.y -= 7;
        if (this.y <= this.targetY) {
            this.exploded = true;
            for (let i = 0; i < 60; i++) {
                const angle = (Math.PI * 2) * (i / 60);
                // 初始化粒子时增加 lastX/lastY
                this.particles.push({
                    x: this.x,
                    y: this.y,
                    lastX: this.x,
                    lastY: this.y,
                    vx: Math.cos(angle) * (Math.random()*2+2),
                    vy: Math.sin(angle) * (Math.random()*2+2),
                    alpha: 1,
                    color: `hsl(${Math.random()*360},100%,80%)`
                });
            }
        }
    } else {
        // 更新前保存当前位置为 lastX/lastY
        this.particles.forEach(p => {
            p.lastX = p.x;
            p.lastY = p.y;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.04;
            p.alpha -= 0.008;
        });
        this.particles = this.particles.filter(p => p.alpha > 0);
    }
};

Firework.prototype.draw = function(ctx) {
    if (!this.exploded) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.restore();
    } else {
        this.particles.forEach(p => {
            // 轨迹
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p.lastX, p.lastY);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 2.5;
            ctx.globalAlpha = Math.max(p.alpha, 0.3);
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.stroke();
            ctx.restore();

            // 粒子
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.5, 0, Math.PI*2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.restore();
        });
    }
};
    function animate() {
        if (!running) return;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if (Math.random() < 0.04) fireworks.push(new Firework());
        fireworks.forEach(fw => {
            fw.update();
            fw.draw(ctx);
        });
        fireworks = fireworks.filter(fw => !fw.exploded || fw.particles.length > 0);
        requestAnimationFrame(animate);
    }
    animate();

    // 停止烟花
    canvas._stop = () => { running = false; };
}

function stopFireworks() {
    const fwDiv = document.getElementById('reward-fireworks');
    if (fwDiv.firstChild && fwDiv.firstChild._stop) fwDiv.firstChild._stop();
    fwDiv.innerHTML = '';
}