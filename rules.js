//点击按钮菜单显示 再次点击按钮关闭菜单
document.querySelector('.dropbtn').onclick=function(e) {
    e.stopPropagation();
    document.querySelector('.dropdown-content').classList.toggle('show');
}

//内容弹窗
const ruleModal=document.getElementById('ruleModal');
const ruleTitle=document.getElementById('ruleTitle');
const ruleContent=document.getElementById('ruleContent');
const closeBtn=document.querySelector('.close-btn')

//点击菜单项内容弹窗显示
document.querySelectorAll('.rule-item').forEach(item=>{
    item.addEventListener('click',function(e) {
        ruleTitle.textContent=this.getAttribute('data-title');
        ruleContent.textContent=this.getAttribute('data-content');
        ruleModal.style.display='flex';
    })
})

//点击关闭按钮关闭内容弹窗
closeBtn.addEventListener('click',function(){
    ruleModal.style.display='none';
});

//点击弹窗外部区域关闭弹窗
ruleModal.onclick=function(e){
    if (e.target===ruleModal) {
        ruleModal.style.display='none';
    }
}



