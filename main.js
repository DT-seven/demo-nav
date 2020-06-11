$(function () {
  const x = localStorage.getItem("x");
  const xObject = JSON.parse(x);
  const simplifyUrl = (url) => {
    return url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .replace(/\/.*/, ""); // 删除 / 开头的内容
  };

  let hasMap = xObject || [
    { logo: "A", url: "https://www.acfun.cn" },
    { logo: "B", url: "https://www.bilibili.com" },
  ];

  const $siteList = $(".siteList");
  const $liLast = $siteList.find("li.last");
  let render = () => {
    hasMap.forEach((node, index) => {
      const $li = $(`<li><form method='get' action='${node.url}'>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${node.url}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </li></form>`).insertBefore($liLast);
      $li.on("click", () => {
        window.open(node.url);
      });
      $li.on("click", ".close", (e) => {
        e.stopPropagation(); // 阻止冒泡
        hasMap.splice(index, 1);
        $(e.target).parent().parent().parent().remove();
      });
    });
  };
  render();
  $(".addButton").on("click", () => {
    let url = window.prompt("请问你想查询的网址是什么？");
    if (url.indexOf !== 0) {
      url = "https://" + url;
    }
    hasMap.push({
      logo: simplifyUrl(url)[0].toUpperCase(),
      url: url,
    });
    console.log(hasMap);
    $siteList.find("li:not(.last)").remove();
    render();
  });

  window.onbeforeunload = () => {
    const string = JSON.stringify(hasMap);
    localStorage.setItem("x", string);
  };
});
