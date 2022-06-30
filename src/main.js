
    
const xx = window.localStorage.getItem('x') 
const xxObject = JSON.parse(xx) 

const hashMap = xxObject  ||  [   
    {logo:'A',url:'https://www.acfun.cn'},
    {logo:'B',url:'https://www.bilibili.com'},
    {logo:'D',url:'https://developer.mozilla.org/zh-CN/'},
    {logo:'Z',url:'https://www.zhihu.com'},
    {logo:'G',url:'https://www.google.com'},
    {logo:'W',url:'https://www.w3school.com.cn/'},
    {logo:'F',url:'https://www.figma.com/'},
    {logo:'F',url:'https://excalidraw.com/'}
]

const simplifyUrl = (url) => {
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'') //用了正则表达式  将/开头的所有内容  替换成空字符串''     
}
      
const render = () => {
  $('li:not(.last)').remove() //重要步骤，除了<li class='last'>不删 其他所有li都删除
     hashMap.forEach((node,index)=>{
    const $li = $(`<li>
    <div class="site">
      <div class="logo">${node.logo}</div>
      <div class="link">${simplifyUrl(node.url)}</div>
      <div class='close'>
      <svg class="iconpark-icon"><use href="#close-small"></use></svg>
    </div>
    </div>
  </li>`).insertBefore($('li.last'))

  $li.on('click',() => { window.open(node.url) })   //替代a标签 这里肯定用了重载 因为第二个参数是箭头函数了
  $li.on('click','.close',(e)=>{
   e.stopPropagation()
   console.log(index)
   hashMap.splice(index,1)
   render()
  })
})
}
render()

$(".addButton").on('click',()=>{
     let url =  window.prompt('请问您需要新增什么网址')
     if(url.indexOf('http')===-1){
        url =  'https://' + url
     }
     console.log(url)
     hashMap.push( {
        logo:simplifyUrl(url)[0].toUpperCase(),
        url:url 
      })
     $('li:not(.last)').remove() //重要步骤，除了<li class='last'>不删 其他所有li都删除
     render()  //把用户写的url 生成对应的<li>....</li> 并且这个li 要放到<li class='last'>前面
     })


     window.onbeforeunload = () =>{
        const  string = JSON.stringify(hashMap)
        window.localStorage.setItem('x',string) 
     }

     $(document).on('keypress',(e)=>{
      const key = e.key
      for(let i=0;i<hashMap.length;i++){
         if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
         }
      }
     })

     $('.input').on('keypress',(e)=>{
      e.stopPropagation()
     })



