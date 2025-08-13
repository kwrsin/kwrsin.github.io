(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".map-container{--gap: 30px;--root-radius: 30px;--main-radius: 20px;--root-color: #ffffff;--root-bgcolor: #4c4f69;--root-border-color: rgba(0, 0, 0, 0);--main-color: #444446;--main-bgcolor: #ffffff;--topic-padding: 3px;--color: #777777;--bgcolor: #f6f6f6;--selected: #4dc4ff;--panel-color: #444446;--panel-bgcolor: #ffffff;--panel-border-color: #eaeaea;-webkit-tap-highlight-color:rgba(0,0,0,0);font-family:-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-user-select:none;user-select:none;height:100%;width:100%;overflow:scroll;font-size:15px}.map-container *{box-sizing:border-box}.map-container::-webkit-scrollbar{width:0px;height:0px}.map-container .selected{outline:2px solid var(--selected);outline-offset:1px}.map-container .hyper-link{text-decoration:none;margin-left:.3em}.map-container .lhs{direction:rtl}.map-container .lhs me-tpc{direction:ltr}.map-container .map-canvas{height:20000px;width:20000px;position:relative;-webkit-user-select:none;user-select:none;transition:transform .3s;transform:scale(1);background-color:var(--bgcolor)}.map-container .map-canvas me-nodes{position:absolute;display:flex;justify-content:center;align-items:center;height:fit-content;width:fit-content}.map-container .map-canvas me-root{position:relative}.map-container .map-canvas me-root me-tpc{display:block;font-size:25px;color:var(--root-color);padding:10px var(--gap);border-radius:var(--root-radius);border:var(--root-border-color) 2px solid;white-space:pre-wrap;background-color:var(--root-bgcolor)}.map-container me-main>me-wrapper{position:relative;margin:45px 65px}.map-container me-main>me-wrapper>me-parent{margin:10px;padding:0}.map-container me-main>me-wrapper>me-parent>me-tpc{border-radius:var(--main-radius);background-color:var(--main-bgcolor);border:2px solid var(--main-color);color:var(--main-color);padding:8px 25px}.map-container me-wrapper{display:block;pointer-events:none;width:fit-content}.map-container me-children,.map-container me-parent{display:inline-block;vertical-align:middle}.map-container me-parent{position:relative;cursor:pointer;padding:6px var(--gap);margin-top:10px}.map-container me-parent me-tpc{position:relative;display:block;border-radius:3px;color:var(--color);pointer-events:all;max-width:35em;white-space:pre-wrap;padding:var(--topic-padding)}.map-container me-parent me-tpc .insert-preview{position:absolute;width:100%;left:0;z-index:9}.map-container me-parent me-tpc .show{background:#7ad5ff;pointer-events:none;opacity:.7}.map-container me-parent me-tpc .before{height:14px;top:-14px}.map-container me-parent me-tpc .in{height:100%;top:0}.map-container me-parent me-tpc .after{height:14px;bottom:-14px}.map-container me-parent me-epd{position:absolute;height:18px;width:18px;opacity:.8;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgdD0iMTY1NjY1NDcxNzI0MiIgY2xhc3M9Imljb24iIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHZlcnNpb249IjEuMSIKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+CiAgICA8cGF0aCBkPSJNNTEyIDc0LjY2NjY2N0MyNzAuOTMzMzMzIDc0LjY2NjY2NyA3NC42NjY2NjcgMjcwLjkzMzMzMyA3NC42NjY2NjcgNTEyUzI3MC45MzMzMzMgOTQ5LjMzMzMzMyA1MTIgOTQ5LjMzMzMzMyA5NDkuMzMzMzMzIDc1My4wNjY2NjcgOTQ5LjMzMzMzMyA1MTIgNzUzLjA2NjY2NyA3NC42NjY2NjcgNTEyIDc0LjY2NjY2N3oiIHN0cm9rZS13aWR0aD0iNTQiIHN0cm9rZT0nYmxhY2snIGZpbGw9J3doaXRlJyA+PC9wYXRoPgogICAgPHBhdGggZD0iTTY4Mi42NjY2NjcgNDgwaC0xMzguNjY2NjY3VjM0MS4zMzMzMzNjMC0xNy4wNjY2NjctMTQuOTMzMzMzLTMyLTMyLTMycy0zMiAxNC45MzMzMzMtMzIgMzJ2MTM4LjY2NjY2N0gzNDEuMzMzMzMzYy0xNy4wNjY2NjcgMC0zMiAxNC45MzMzMzMtMzIgMzJzMTQuOTMzMzMzIDMyIDMyIDMyaDEzOC42NjY2NjdWNjgyLjY2NjY2N2MwIDE3LjA2NjY2NyAxNC45MzMzMzMgMzIgMzIgMzJzMzItMTQuOTMzMzMzIDMyLTMydi0xMzguNjY2NjY3SDY4Mi42NjY2NjdjMTcuMDY2NjY3IDAgMzItMTQuOTMzMzMzIDMyLTMycy0xNC45MzMzMzMtMzItMzItMzJ6Ij48L3BhdGg+Cjwvc3ZnPg==);background-repeat:no-repeat;background-size:contain;background-position:center;pointer-events:all;z-index:9}.map-container me-parent me-epd.minus{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgdD0iMTY1NjY1NTU2NDk4NSIgY2xhc3M9Imljb24iIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHZlcnNpb249IjEuMSIKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+CiAgICA8cGF0aCBkPSJNNTEyIDc0LjY2NjY2N0MyNzAuOTMzMzMzIDc0LjY2NjY2NyA3NC42NjY2NjcgMjcwLjkzMzMzMyA3NC42NjY2NjcgNTEyUzI3MC45MzMzMzMgOTQ5LjMzMzMzMyA1MTIgOTQ5LjMzMzMzMyA5NDkuMzMzMzMzIDc1My4wNjY2NjcgOTQ5LjMzMzMzMyA1MTIgNzUzLjA2NjY2NyA3NC42NjY2NjcgNTEyIDc0LjY2NjY2N3oiIHN0cm9rZS13aWR0aD0iNTQiIHN0cm9rZT0nYmxhY2snIGZpbGw9J3doaXRlJyA+PC9wYXRoPgogICAgPHBhdGggZD0iTTY4Mi42NjY2NjcgNTQ0SDM0MS4zMzMzMzNjLTE3LjA2NjY2NyAwLTMyLTE0LjkzMzMzMy0zMi0zMnMxNC45MzMzMzMtMzIgMzItMzJoMzQxLjMzMzMzNGMxNy4wNjY2NjcgMCAzMiAxNC45MzMzMzMgMzIgMzJzLTE0LjkzMzMzMyAzMi0zMiAzMnoiPjwvcGF0aD4KPC9zdmc+)!important;transition:opacity .3s;opacity:0}.map-container me-parent me-epd.minus:hover{opacity:.8}.map-container .icon{width:1em;height:1em;vertical-align:-.15em;fill:currentColor;overflow:hidden}.map-container .lines,.map-container .summary,.map-container .subLines,.map-container .topiclinks,.map-container .linkcontroller{position:absolute;height:102%;width:100%;top:0;left:0}.map-container .topiclinks,.map-container .linkcontroller,.map-container .summary{pointer-events:none}.map-container .topiclinks text,.map-container .linkcontroller text,.map-container .summary text{pointer-events:all}.map-container .topiclinks .selected,.map-container .linkcontroller .selected,.map-container .summary .selected{pointer-events:none}.map-container .lines,.map-container .subLines{pointer-events:none;z-index:-1}.map-container .topiclinks *,.map-container .linkcontroller *{z-index:100}.map-container .topiclinks g{cursor:pointer}.map-container #input-box{position:absolute;top:0;left:0;width:max-content;max-width:35em;z-index:11;direction:ltr;-webkit-user-select:auto;user-select:auto;pointer-events:auto;background-color:var(--bgcolor)}.map-container me-tpc>*{pointer-events:none}.map-container me-tpc>a,.map-container me-tpc>iframe{pointer-events:auto}.map-container me-tpc>img{display:block;margin-bottom:8px;object-fit:cover}.map-container me-tpc>.text{display:inline-block}.map-container .circle{position:absolute;height:10px;width:10px;margin-top:-5px;margin-left:-5px;border-radius:100%;background:#757575;border:2px solid #ffffff;cursor:pointer}.map-container .tags{direction:ltr}.map-container .tags span{display:inline-block;border-radius:3px;padding:2px 4px;background:#d6f0f8;color:#276f86;margin:2px 4px 0 0;font-size:12px;line-height:1.3em}.map-container .icons{display:inline-block;direction:ltr;margin-left:5px}.map-container .icons span{display:inline-block;line-height:1.3em}.map-container .mind-elixir-ghost{position:fixed;top:-100%;left:-100%;box-sizing:content-box;opacity:.5;background-color:var(--main-bgcolor);border:2px solid var(--main-color);color:var(--main-color);max-width:200px;width:fit-content;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding:8px 16px;border-radius:6px}.map-container .selection-area{background:#4f90f22d;border:1px solid #4f90f2}.map-container .context-menu{position:fixed;top:0;left:0;width:100%;height:100%;z-index:99}.map-container .context-menu .menu-list{position:fixed;list-style:none;margin:0;padding:0;color:var(--panel-color);box-shadow:0 12px 15px #0003;border-radius:5px;overflow:hidden}.map-container .context-menu .menu-list li{min-width:200px;overflow:hidden;white-space:nowrap;padding:6px 10px;background:var(--panel-bgcolor);border-bottom:1px solid var(--panel-border-color);cursor:pointer}.map-container .context-menu .menu-list li span{line-height:20px}.map-container .context-menu .menu-list li a{color:#333;text-decoration:none}.map-container .context-menu .menu-list li.disabled{display:none}.map-container .context-menu .menu-list li:hover{filter:brightness(.95)}.map-container .context-menu .menu-list li:last-child{border-bottom:0}.map-container .context-menu .menu-list li span:last-child{float:right}.map-container .context-menu .key{font-size:10px;background-color:#f1f1f1;color:#333;padding:2px 5px;border-radius:3px}.map-container .tips{position:absolute;bottom:20px;left:50%;transform:translate(-50%);color:var(--panel-color);font-weight:bolder}.mind-elixir-toolbar{font-family:iconfont;position:absolute;color:var(--panel-color);background:var(--panel-bgcolor);padding:10px;border-radius:5px;box-shadow:0 1px 2px #0003}.mind-elixir-toolbar svg{display:inline-block}.mind-elixir-toolbar span:active{opacity:.5}.mind-elixir-toolbar.rb{right:20px;bottom:20px}.mind-elixir-toolbar.rb span+span{margin-left:10px}.mind-elixir-toolbar.lt{font-size:20px;left:20px;top:20px}.mind-elixir-toolbar.lt span{display:block}.mind-elixir-toolbar.lt span+span{margin-top:10px}")),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
(function(e) {
  var t, n, o, i, s, r, c = '<svg><symbol id="icon-edit" viewBox="0 0 1024 1024"><path d="M423.765333 128a42.666667 42.666667 0 0 1 3.2 85.205333L423.765333 213.333333H234.666667a64 64 0 0 0-63.872 60.245334L170.666667 277.333333v512a64 64 0 0 0 60.245333 63.872L234.666667 853.333333h512a64 64 0 0 0 63.872-60.245333L810.666667 789.333333v-189.098666a42.666667 42.666667 0 0 1 85.205333-3.2l0.128 3.2V789.333333a149.333333 149.333333 0 0 1-144.213333 149.248L746.666667 938.666667h-512a149.333333 149.333333 0 0 1-149.248-144.213334L85.333333 789.333333v-512a149.333333 149.333333 0 0 1 144.213334-149.248L234.666667 128h189.098666z m324.949334-53.248a42.666667 42.666667 0 0 1 60.330666 0l150.869334 150.869333a42.666667 42.666667 0 0 1 0 60.330667l-329.386667 329.386667a42.666667 42.666667 0 0 1-29.44 12.458666l-153.386667 2.517334a42.666667 42.666667 0 0 1-43.349333-43.349334l2.56-153.386666a42.666667 42.666667 0 0 1 12.458667-29.44z m30.165333 90.496L491.946667 452.266667l-1.493334 91.989333 92.032-1.493333 286.976-286.976-90.538666-90.538667z"  ></path></symbol><symbol id="icon-rising" viewBox="0 0 1024 1024"><path d="M553.173333 803.84h-64l0.021334-474.581333-224.021334 224-45.269333-45.226667L521.6 206.293333l301.717333 301.696-45.269333 45.269334-224.853333-224.896v475.477333z"  ></path></symbol><symbol id="icon-falling" viewBox="0 0 1024 1024"><path d="M553.173333 238.314667h-64l0.021334 474.602666-224.021334-224-45.269333 45.226667L521.6 835.861333l301.717333-301.717333-45.269333-45.226667-224.853333 224.853334V238.336z"  ></path></symbol><symbol id="icon-shanchu2" viewBox="0 0 1024 1024"><path d="M516.60601807 107.93026734c-82.64382935 0-149.71865844 65.51751709-152.5729065 147.77160644H171.37136841c-21.40603638 0-38.92044068 17.38504028-38.92044068 38.92126465 0 21.40686036 17.38504028 38.92208862 38.92126466 38.92208862h42.94308471v435.40136719c0 81.73498536 55.39828492 148.55026245 123.90106201 148.55026245h348.99444581c68.37341309 0 123.90106201-66.42553711 123.901062-148.55026245V333.80477906h38.92126465c21.40686036 0 38.92126464-17.38586426 38.92126465-38.92208863 0-21.40686036-17.38504028-38.92126464-38.92126465-38.92126465H668.91854859C666.45321656 173.44860839 599.24902344 107.93109131 516.60601807 107.93109131z m-79.65939331 147.77160644c2.85424805-42.16442872 37.2354126-74.85809326 79.78875732-74.85809326s76.93450927 32.82302857 79.39984131 74.85809326H436.94662476z m-98.86047364 589.01165771c-24.2611084 0-50.98754883-31.13717651-50.98754883-75.76693725V333.80477906h450.97036744V769.33551026c0 44.50039673-26.72644043 75.76776123-50.98754884 75.76776122H338.08615112v-0.38973999z m0 0"  ></path><path d="M390.37063599 751.17263794c17.77313232 0 32.43411255-17.7739563 32.43411255-40.08883667V482.35504151c0-22.31488037-14.53079224-40.08966065-32.43411255-40.08966065-17.77478027 0-32.43493653 17.77478027-32.43493653 40.08966065v228.72875976c0 22.18469239 14.27124023 40.08883667 32.43493653 40.08883667z m117.41308594 0c17.7739563 0 32.43411255-17.7739563 32.43411255-40.08883667V482.35504151c0-22.31488037-14.53079224-40.08966065-32.43411255-40.08966065-17.7739563 0-32.43493653 17.77478027-32.43493653 40.08966065v228.72875976c0 22.18469239 14.66098023 40.08883667 32.43493653 40.08883667z m123.51049804 0c17.7739563 0 32.43493653-17.7739563 32.43493652-40.08883667V482.35504151c0-22.31488037-14.53079224-40.08966065-32.43493652-40.08966065-17.7739563 0-32.43411255 17.77478027-32.43411255 40.08966065v228.72875976c0 22.18469239 14.14105224 40.08883667 32.43411255 40.08883667z m0 0"  ></path></symbol><symbol id="icon-zijiedian" viewBox="0 0 1024 1024"><path d="M312.208 472c19.568-157.856 153.432-280 315.656-280 175.68 0 318.112 143.272 318.112 320S803.552 832 627.864 832c-162.224 0-296.08-122.144-315.656-280H120a40 40 0 0 1 0-80h192.208zM632 752c132.552 0 240-107.448 240-240 0-132.552-107.448-240-240-240-132.552 0-240 107.448-240 240 0 132.552 107.448 240 240 240z m-40-280v-80a40 40 0 0 1 80 0v80h80a40 40 0 0 1 0 80h-80v80a40 40 0 0 1-80 0v-80h-80a40 40 0 0 1 0-80h80z"  ></path></symbol><symbol id="icon-tongjijiedian-" viewBox="0 0 1024 1024"><path d="M803.84 131.626667H410.24A59.733333 59.733333 0 0 0 350.506667 192v45.226667H199.68a51.626667 51.626667 0 0 0-51.626667 51.626666v465.92a51.626667 51.626667 0 0 0 51.626667 51.626667h187.52v-55.466667h-162.133333a21.333333 21.333333 0 0 1-21.333334-21.333333V313.386667a21.333333 21.333333 0 0 1 21.333334-21.333334h125.653333v64a59.733333 59.733333 0 0 0 59.733333 59.733334h393.386667a59.733333 59.733333 0 0 0 59.733333-59.733334V192a59.733333 59.733333 0 0 0-59.733333-60.373333z m4.266667 224.64a4.266667 4.266667 0 0 1-4.266667 4.266666H410.24a4.266667 4.266667 0 0 1-4.266667-4.266666V192a4.266667 4.266667 0 0 1 4.266667-4.266667h393.6a4.266667 4.266667 0 0 1 4.266667 4.266667zM716.16 749.44h-81.28v-81.493333a27.733333 27.733333 0 0 0-55.466667 0v81.28h-81.493333a27.733333 27.733333 0 1 0 0 55.466666h81.28v81.28a27.733333 27.733333 0 1 0 55.466667 0v-81.066666h81.28a27.733333 27.733333 0 0 0 0-55.466667z"  ></path></symbol><symbol id="icon-close" viewBox="0 0 1024 1024"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128L512.128 467.904l-263.04-263.84c-12.448-12.48-32.704-12.544-45.248-0.064-12.512 12.48-12.544 32.736-0.064 45.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248a31.937 31.937 0 0 0 22.688 9.44c8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408a31.94 31.94 0 0 0 22.592-9.344c12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" fill="" ></path></symbol><symbol id="icon-menu" viewBox="0 0 1024 1024"><path d="M109.714 292.571h804.572c21.943 0 36.571-21.942 36.571-43.885 0-14.629-14.628-29.257-36.571-29.257H109.714c-21.943 0-36.571 14.628-36.571 36.571 0 14.629 14.628 36.571 36.571 36.571zM914.286 512H109.714c-21.943 0-36.571 14.629-36.571 36.571 0 14.629 14.628 36.572 36.571 36.572h804.572c21.943 0 36.571-21.943 36.571-43.886 0-14.628-14.628-29.257-36.571-29.257z m0 292.571H109.714c-21.943 0-36.571 14.629-36.571 36.572s14.628 36.571 36.571 36.571h804.572c21.943 0 36.571-21.943 36.571-36.571 0-21.943-14.628-36.572-36.571-36.572z"  ></path></symbol><symbol id="icon-right" viewBox="0 0 1024 1024"><path d="M385 560.69999999L385 738.9c0 36.90000001 26.4 68.5 61.3 68.5l150.2 0c1.5 0 3-0.1 4.5-0.3 10.2 38.7 45.5 67.3 87.5 67.3 50 0 90.5-40.5 90.5-90.5s-40.5-90.5-90.5-90.5c-42 0-77.3 28.6-87.5 67.39999999-1.4-0.3-2.9-0.4-4.5-0.39999999L446.3 760.4c-6.8 0-14.3-8.9-14.3-21.49999999l0-427.00000001c0-12.7 7.40000001-21.5 14.30000001-21.5l150.19999999 0c1.5 0 3-0.2 4.5-0.4 10.2 38.8 45.5 67.3 87.5 67.3 50 0 90.5-40.5 90.5-90.4 0-49.9-40.5-90.6-90.5-90.59999999-42 0-77.3 28.6-87.5 67.39999999-1.4-0.2-2.9-0.4-4.49999999-0.4L446.3 243.3c-34.80000001 0-61.3 31.6-61.3 68.50000001L385 513.7l-79.1 0c-10.4-38.5-45.49999999-67-87.4-67-50 0-90.5 40.5-90.5 90.5s40.5 90.5 90.5 90.5c41.79999999 0 77.00000001-28.4 87.4-67L385 560.69999999z" fill="" ></path></symbol><symbol id="icon-left" viewBox="0 0 1024 1024"><path d="M639 463.30000001L639 285.1c0-36.90000001-26.4-68.5-61.3-68.5l-150.2 0c-1.5 0-3 0.1-4.5 0.3-10.2-38.7-45.5-67.3-87.5-67.3-50 0-90.5 40.5-90.5 90.5s40.5 90.5 90.5 90.5c42 0 77.3-28.6 87.5-67.39999999 1.4 0.3 2.9 0.4 4.5 0.39999999L577.7 263.6c6.8 0 14.3 8.9 14.3 21.49999999l0 427.00000001c0 12.7-7.40000001 21.5-14.30000001 21.5l-150.19999999 0c-1.5 0-3 0.2-4.5 0.4-10.2-38.8-45.5-67.3-87.5-67.3-50 0-90.5 40.5-90.5 90.4 0 49.9 40.5 90.6 90.5 90.59999999 42 0 77.3-28.6 87.5-67.39999999 1.4 0.2 2.9 0.4 4.49999999 0.4L577.7 780.7c34.80000001 0 61.3-31.6 61.3-68.50000001L639 510.3l79.1 0c10.4 38.5 45.49999999 67 87.4 67 50 0 90.5-40.5 90.5-90.5s-40.5-90.5-90.5-90.5c-41.79999999 0-77.00000001 28.4-87.4 67L639 463.30000001z" fill="" ></path></symbol><symbol id="icon-side" viewBox="0 0 1024 1024"><path d="M851.91168 328.45312c-59.97056 0-108.6208 48.47104-108.91264 108.36992l-137.92768 38.4a109.14304 109.14304 0 0 0-63.46752-46.58688l1.39264-137.11872c47.29344-11.86816 82.31936-54.66624 82.31936-105.64096 0-60.15488-48.76288-108.91776-108.91776-108.91776s-108.91776 48.76288-108.91776 108.91776c0 49.18784 32.60928 90.75712 77.38368 104.27392l-1.41312 138.87488a109.19936 109.19936 0 0 0-63.50336 48.55808l-138.93632-39.48544 0.01024-0.72704c0-60.15488-48.76288-108.91776-108.91776-108.91776s-108.91776 48.75776-108.91776 108.91776c0 60.15488 48.76288 108.91264 108.91776 108.91264 39.3984 0 73.91232-20.92032 93.03552-52.2496l139.19232 39.552-0.00512 0.2304c0 25.8304 9.00096 49.5616 24.02816 68.23424l-90.14272 132.63872a108.7488 108.7488 0 0 0-34.2528-5.504c-60.15488 0-108.91776 48.768-108.91776 108.91776 0 60.16 48.76288 108.91776 108.91776 108.91776 60.16 0 108.92288-48.75776 108.92288-108.91776 0-27.14624-9.9328-51.968-26.36288-71.04l89.04704-131.03104a108.544 108.544 0 0 0 37.6832 6.70208 108.672 108.672 0 0 0 36.48512-6.272l93.13792 132.57216a108.48256 108.48256 0 0 0-24.69888 69.0688c0 60.16 48.768 108.92288 108.91776 108.92288 60.16 0 108.91776-48.76288 108.91776-108.92288 0-60.14976-48.75776-108.91776-108.91776-108.91776a108.80512 108.80512 0 0 0-36.69504 6.3488l-93.07136-132.48a108.48768 108.48768 0 0 0 24.79616-72.22784l136.09984-37.888c18.99008 31.93856 53.84192 53.3504 93.69088 53.3504 60.16 0 108.92288-48.75776 108.92288-108.91264-0.00512-60.15488-48.77312-108.92288-108.92288-108.92288z"  ></path></symbol><symbol id="icon-B" viewBox="0 0 1024 1024"><path d="M98.067692 65.457231H481.28c75.854769 0 132.411077 3.150769 169.668923 9.452307 37.336615 6.301538 70.656 19.534769 100.036923 39.620924 29.459692 20.007385 53.956923 46.710154 73.570462 80.029538 19.692308 33.398154 29.459692 70.734769 29.459692 112.167385 0 44.898462-12.130462 86.094769-36.233846 123.588923a224.886154 224.886154 0 0 1-98.461539 84.283077c58.368 17.092923 103.266462 46.08 134.695385 87.04 31.350154 40.96 47.025231 89.088 47.025231 144.462769 0 43.638154-10.082462 86.016-30.404923 127.212308-20.243692 41.196308-47.891692 74.043077-83.02277 98.697846-35.052308 24.654769-78.296615 39.778462-129.732923 45.449846-32.295385 3.465846-110.119385 5.671385-233.472 6.537846H98.067692V65.457231z m193.536 159.507692V446.621538h126.818462c75.460923 0 122.328615-1.024 140.603077-3.229538 33.083077-3.938462 59.155692-15.36 78.139077-34.343385 18.904615-18.904615 28.435692-43.874462 28.435692-74.830769 0-29.696-8.192-53.720615-24.497231-72.310154-16.384-18.510769-40.644923-29.696-72.940307-33.634461-19.140923-2.205538-74.279385-3.308308-165.415385-3.308308h-111.064615z m0 381.243077v256.315077h179.2c69.710769 0 113.979077-1.969231 132.726154-5.907692 28.750769-5.198769 52.145231-17.959385 70.262154-38.281847 18.116923-20.243692 27.096615-47.340308 27.096615-81.368615 0-28.750769-6.931692-53.169231-20.873846-73.255385a118.232615 118.232615 0 0 0-60.494769-43.795692c-26.387692-9.137231-83.574154-13.705846-171.638154-13.705846H291.603692z"  ></path></symbol><symbol id="icon-a" viewBox="0 0 1024 1024"><path d="M757.76 665.6q0 20.48 1.536 34.304t7.68 22.016 18.944 12.288 34.304 4.096q-3.072 25.6-15.36 44.032-11.264 16.384-33.28 29.696t-62.976 13.312q-11.264 0-20.48-0.512t-17.408-2.56l-6.144-2.048-1.024 0q-4.096-1.024-10.24-4.096-2.048-2.048-4.096-2.048-1.024-1.024-2.048-1.024-14.336-8.192-23.552-17.408t-14.336-17.408q-6.144-10.24-9.216-20.48-63.488 75.776-178.176 75.776-48.128 0-88.064-15.36t-69.12-44.032-45.056-68.096-15.872-88.576 16.896-89.088 47.616-67.584 74.24-42.496 96.768-14.848q48.128 0 88.576 17.408t66.048 49.152q0-8.192 0.512-16.384t0.512-15.36q0-71.68-39.936-104.448t-128-32.768q-43.008 0-84.992 6.656t-84.992 17.92q14.336-28.672 25.088-47.616t24.064-29.184q30.72-24.576 158.72-24.576 79.872 0 135.168 13.824t90.624 43.52 51.2 75.264 15.872 108.032l0 200.704zM487.424 743.424q50.176 0 79.872-33.28t29.696-95.744q0-61.44-28.672-93.696t-76.8-32.256q-52.224 0-82.944 33.28t-30.72 94.72q0 58.368 31.744 92.672t77.824 34.304z"  ></path></symbol><symbol id="icon-full" viewBox="0 0 1024 1024"><path d="M639.328 416c8.032 0 16.096-3.008 22.304-9.056l202.624-197.184-0.8 143.808c-0.096 17.696 14.144 32.096 31.808 32.192 0.064 0 0.128 0 0.192 0 17.6 0 31.904-14.208 32-31.808l1.248-222.208c0-0.672-0.352-1.248-0.384-1.92 0.032-0.512 0.288-0.896 0.288-1.408 0.032-17.664-14.272-32-31.968-32.032L671.552 96l-0.032 0c-17.664 0-31.968 14.304-32 31.968C639.488 145.632 653.824 160 671.488 160l151.872 0.224-206.368 200.8c-12.672 12.32-12.928 32.608-0.64 45.248C622.656 412.736 630.976 416 639.328 416z"  ></path><path d="M896.032 639.552 896.032 639.552c-17.696 0-32 14.304-32.032 31.968l-0.224 151.872-200.832-206.4c-12.32-12.64-32.576-12.96-45.248-0.64-12.672 12.352-12.928 32.608-0.64 45.248l197.184 202.624-143.808-0.8c-0.064 0-0.128 0-0.192 0-17.6 0-31.904 14.208-32 31.808-0.096 17.696 14.144 32.096 31.808 32.192l222.24 1.248c0.064 0 0.128 0 0.192 0 0.64 0 1.12-0.32 1.76-0.352 0.512 0.032 0.896 0.288 1.408 0.288l0.032 0c17.664 0 31.968-14.304 32-31.968L928 671.584C928.032 653.952 913.728 639.584 896.032 639.552z"  ></path><path d="M209.76 159.744l143.808 0.8c0.064 0 0.128 0 0.192 0 17.6 0 31.904-14.208 32-31.808 0.096-17.696-14.144-32.096-31.808-32.192L131.68 95.328c-0.064 0-0.128 0-0.192 0-0.672 0-1.248 0.352-1.888 0.384-0.448 0-0.8-0.256-1.248-0.256 0 0-0.032 0-0.032 0-17.664 0-31.968 14.304-32 31.968L96 352.448c-0.032 17.664 14.272 32 31.968 32.032 0 0 0.032 0 0.032 0 17.664 0 31.968-14.304 32-31.968l0.224-151.936 200.832 206.4c6.272 6.464 14.624 9.696 22.944 9.696 8.032 0 16.096-3.008 22.304-9.056 12.672-12.32 12.96-32.608 0.64-45.248L209.76 159.744z"  ></path><path d="M362.368 617.056l-202.624 197.184 0.8-143.808c0.096-17.696-14.144-32.096-31.808-32.192-0.064 0-0.128 0-0.192 0-17.6 0-31.904 14.208-32 31.808l-1.248 222.24c0 0.704 0.352 1.312 0.384 2.016 0 0.448-0.256 0.832-0.256 1.312-0.032 17.664 14.272 32 31.968 32.032L352.448 928c0 0 0.032 0 0.032 0 17.664 0 31.968-14.304 32-31.968s-14.272-32-31.968-32.032l-151.936-0.224 206.4-200.832c12.672-12.352 12.96-32.608 0.64-45.248S375.008 604.704 362.368 617.056z"  ></path></symbol><symbol id="icon-add" viewBox="0 0 1024 1024"><path d="M863.328 482.56l-317.344-1.12L545.984 162.816c0-17.664-14.336-32-32-32s-32 14.336-32 32l0 318.4L159.616 480.064c-0.032 0-0.064 0-0.096 0-17.632 0-31.936 14.24-32 31.904C127.424 529.632 141.728 544 159.392 544.064l322.592 1.152 0 319.168c0 17.696 14.336 32 32 32s32-14.304 32-32l0-318.944 317.088 1.12c0.064 0 0.096 0 0.128 0 17.632 0 31.936-14.24 32-31.904C895.264 496.992 880.96 482.624 863.328 482.56z"  ></path></symbol><symbol id="icon-move" viewBox="0 0 1024 1024"><path d="M863.744 544 163.424 544c-17.664 0-32-14.336-32-32s14.336-32 32-32l700.32 0c17.696 0 32 14.336 32 32S881.44 544 863.744 544z"  ></path></symbol><symbol id="icon-living" viewBox="0 0 1024 1024"><path d="M514.133333 488.533333m-106.666666 0a106.666667 106.666667 0 1 0 213.333333 0 106.666667 106.666667 0 1 0-213.333333 0Z" fill="" ></path><path d="M512 64C264.533333 64 64 264.533333 64 512c0 236.8 183.466667 428.8 416 445.866667v-134.4c-53.333333-59.733333-200.533333-230.4-200.533333-334.933334 0-130.133333 104.533333-234.666667 234.666666-234.666666s234.666667 104.533333 234.666667 234.666666c0 61.866667-49.066667 153.6-145.066667 270.933334l-59.733333 68.266666V960C776.533333 942.933333 960 748.8 960 512c0-247.466667-200.533333-448-448-448z" fill="" ></path></symbol></svg>', l = (l = document.getElementsByTagName("script"))[l.length - 1].getAttribute("data-injectcss");
  if (l && !e.__iconfont__svg__cssinject__) {
    e.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch {
    }
  }
  function d() {
    s || (s = !0, o());
  }
  t = function() {
    var a, u, h, p;
    (p = document.createElement("div")).innerHTML = c, c = null, (h = p.getElementsByTagName("svg")[0]) && (h.setAttribute("aria-hidden", "true"), h.style.position = "absolute", h.style.width = 0, h.style.height = 0, h.style.overflow = "hidden", a = h, (u = document.body).firstChild ? (p = a, (h = u.firstChild).parentNode.insertBefore(p, h)) : u.appendChild(a));
  }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(t, 0) : (n = function() {
    document.removeEventListener("DOMContentLoaded", n, !1), t();
  }, document.addEventListener("DOMContentLoaded", n, !1)) : document.attachEvent && (o = t, i = e.document, s = !1, (r = function() {
    try {
      i.documentElement.doScroll("left");
    } catch {
      return void setTimeout(r, 50);
    }
    d();
  })(), i.onreadystatechange = function() {
    i.readyState == "complete" && (i.onreadystatechange = null, d());
  });
})(window);
const $ = 0, P = 1, ae = 2, Be = {
  name: "Latte",
  type: "light",
  palette: ["#dd7878", "#ea76cb", "#8839ef", "#e64553", "#fe640b", "#df8e1d", "#40a02b", "#209fb5", "#1e66f5", "#7287fd"],
  cssVar: {
    "--gap": "30px",
    "--main-color": "#444446",
    "--main-bgcolor": "#ffffff",
    "--color": "#777777",
    "--bgcolor": "#f6f6f6",
    "--panel-color": "#444446",
    "--panel-bgcolor": "#ffffff",
    "--panel-border-color": "#eaeaea"
  }
}, Re = {
  name: "Dark",
  type: "dark",
  palette: ["#848FA0", "#748BE9", "#D2F9FE", "#4145A5", "#789AFA", "#706CF4", "#EF987F", "#775DD5", "#FCEECF", "#DA7FBC"],
  cssVar: {
    "--main-color": "#ffffff",
    "--main-bgcolor": "#4c4f69",
    "--color": "#cccccc",
    "--bgcolor": "#252526",
    "--panel-color": "#ffffff",
    "--panel-bgcolor": "#2d3748",
    "--panel-border-color": "#696969"
  }
};
function ie(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}
const se = function(e, t) {
  if (t.id === e)
    return t;
  if (t.children && t.children.length) {
    for (let n = 0; n < t.children.length; n++) {
      const o = se(e, t.children[n]);
      if (o)
        return o;
    }
    return null;
  } else
    return null;
}, B = (e, t) => {
  if (e.parent = t, e.children)
    for (let n = 0; n < e.children.length; n++)
      B(e.children[n], e);
};
function pe(e) {
  if (e.id = U(), e.children)
    for (let t = 0; t < e.children.length; t++)
      pe(e.children[t]);
}
function re(e, t, n, o) {
  const i = o - t, s = e - n;
  let r = Math.atan(Math.abs(i) / Math.abs(s)) / 3.14 * 180;
  s < 0 && i > 0 && (r = 180 - r), s < 0 && i < 0 && (r = 180 + r), s > 0 && i < 0 && (r = 360 - r);
  const c = 12, l = 30, d = r + l, a = r - l;
  return {
    x1: n + Math.cos(Math.PI * d / 180) * c,
    y1: o - Math.sin(Math.PI * d / 180) * c,
    x2: n + Math.cos(Math.PI * a / 180) * c,
    y2: o - Math.sin(Math.PI * a / 180) * c
  };
}
function U() {
  return ((/* @__PURE__ */ new Date()).getTime().toString(16) + Math.random().toString(16).substr(2)).substr(2, 16);
}
const nt = function() {
  const e = U();
  return {
    topic: this.newTopicName,
    id: e
  };
};
function me(e) {
  return JSON.parse(
    JSON.stringify(e, (n, o) => {
      if (n !== "parent")
        return o;
    })
  );
}
const R = (e, t) => {
  let n = 0, o = 0;
  for (; t && t !== e; )
    n += t.offsetLeft, o += t.offsetTop, t = t.offsetParent;
  return { offsetLeft: n, offsetTop: o };
}, C = (e, t) => {
  for (const n in t)
    e.setAttribute(n, t[n]);
}, he = (e) => e ? e.tagName === "ME-TPC" : !1, de = (e) => e.filter((t) => {
  for (let n = 0; n < e.length; n++) {
    if (t === e[n])
      continue;
    if (e[n].parentElement.parentElement.contains(t))
      return !1;
  }
  return !0;
}), k = {
  moved: !1,
  // diffrentiate click and move
  mousedown: !1,
  onMove(e, t) {
    if (this.mousedown) {
      this.moved = !0;
      const n = e.movementX, o = e.movementY, { container: i, map: s, scaleVal: r } = t;
      let c = i.scrollLeft - n, l = i.scrollTop - o;
      if (r < 1) {
        const d = (i.scrollWidth - s.clientWidth * r) / 2, a = (i.scrollHeight - s.clientHeight * r) / 2;
        c = Math.max(d, Math.min(i.scrollWidth - d - i.clientWidth, c)), l = Math.max(a, Math.min(i.scrollHeight - a - i.clientHeight, l));
      }
      i.scrollTo(c, l);
    }
  },
  clear() {
    setTimeout(() => {
      this.moved = !1, this.mousedown = !1;
    }, 0);
  }
};
function ot(e) {
  e.map.addEventListener("click", (t) => {
    var o, i;
    if (t.button !== 0)
      return;
    if ((o = e.helper1) != null && o.moved) {
      e.helper1.clear();
      return;
    }
    if ((i = e.helper2) != null && i.moved) {
      e.helper2.clear();
      return;
    }
    if (k.moved) {
      k.clear();
      return;
    }
    e.clearSelection();
    const n = t.target;
    if (n.tagName === "ME-EPD")
      e.expandNode(n.previousSibling);
    else if (he(n))
      e.selectNode(n, !1, t);
    else if (e.editable)
      n.tagName === "text" ? n.dataset.type === "custom-link" ? e.selectArrow(n.parentElement) : e.selectSummary(n.parentElement) : n.className;
    else
      return;
  }), e.map.addEventListener("dblclick", (t) => {
    if (!e.editable)
      return;
    const n = t.target;
    he(n) ? e.beginEdit(n) : n.tagName === "text" && (n.dataset.type === "custom-link" ? e.editArrowLabel(n.parentElement) : e.editSummary(n.parentElement));
  }), e.map.addEventListener("mousemove", (t) => {
    t.target.contentEditable === "inherit" && k.onMove(t, e);
  }), e.map.addEventListener("mousedown", (t) => {
    const n = e.mouseSelectionButton === 0 ? 2 : 0;
    t.button === n && t.target.contentEditable === "inherit" && (k.moved = !1, k.mousedown = !0);
  }), e.map.addEventListener("mouseleave", (t) => {
    const n = e.mouseSelectionButton === 0 ? 2 : 0;
    t.button === n && k.clear();
  }), e.map.addEventListener("mouseup", (t) => {
    const n = e.mouseSelectionButton === 0 ? 2 : 0;
    t.button === n && k.clear();
  });
}
const it = {
  create() {
    return {
      handlers: {},
      showHandler: function() {
      },
      addListener: function(e, t) {
        this.handlers[e] === void 0 && (this.handlers[e] = []), this.handlers[e].push(t);
      },
      fire: function(e, ...t) {
        if (this.handlers[e] instanceof Array) {
          const n = this.handlers[e];
          for (let o = 0; o < n.length; o++)
            n[o](...t);
        }
      },
      removeListener: function(e, t) {
        if (!this.handlers[e])
          return;
        const n = this.handlers[e];
        if (!t)
          n.length = 0;
        else if (n.length)
          for (let o = 0; o < n.length; o++)
            n[o] === t && this.handlers[e].splice(o, 1);
      }
    };
  }
};
var L = /* @__PURE__ */ ((e) => (e.LHS = "lhs", e.RHS = "rhs", e))(L || {});
const ce = document, st = function() {
  this.nodes.innerHTML = "";
  const e = this.createTopic(this.nodeData);
  ge(e, this.nodeData), e.draggable = !1;
  const t = ce.createElement("me-root");
  t.appendChild(e);
  const n = this.nodeData.children || [];
  if (this.direction === ae) {
    let o = 0, i = 0;
    n.map((s) => {
      s.direction === $ ? o += 1 : s.direction === P ? i += 1 : o <= i ? (s.direction = $, o += 1) : (s.direction = P, i += 1);
    });
  }
  rt(this, n, t);
}, rt = function(e, t, n) {
  const o = ce.createElement("me-main");
  o.className = L.LHS;
  const i = ce.createElement("me-main");
  i.className = L.RHS;
  for (let s = 0; s < t.length; s++) {
    const r = t[s], { grp: c } = e.createWrapper(r);
    e.direction === ae ? r.direction === $ ? o.appendChild(c) : i.appendChild(c) : e.direction === $ ? o.appendChild(c) : i.appendChild(c);
  }
  e.nodes.appendChild(o), e.nodes.appendChild(n), e.nodes.appendChild(i), e.nodes.appendChild(e.lines);
}, ct = function(e, t) {
  const n = ce.createElement("me-children");
  for (let o = 0; o < t.length; o++) {
    const i = t[o], { grp: s } = e.createWrapper(i);
    n.appendChild(s);
  }
  return n;
}, T = document, S = (e, t) => {
  const o = (t ? t.mindElixirBox : T).querySelector(`[data-nodeid=me${e}]`);
  if (!o)
    throw new Error(`FindEle: Node ${e} not found, maybe it's collapsed.`);
  return o;
}, ge = function(e, t) {
  if (e.innerHTML = "", t.style && (e.style.color = t.style.color || "", e.style.background = t.style.background || "", e.style.fontSize = t.style.fontSize + "px", e.style.fontWeight = t.style.fontWeight || "normal"), t.dangerouslySetInnerHTML) {
    e.innerHTML = t.dangerouslySetInnerHTML;
    return;
  }
  if (t.image) {
    const n = t.image;
    if (n.url && n.width && n.height) {
      const o = T.createElement("img");
      o.src = n.url, o.style.width = n.width + "px", o.style.height = n.height + "px", n.fit && (o.style.objectFit = n.fit), e.appendChild(o), e.image = o;
    }
  } else
    e.image && (e.image = void 0);
  {
    const n = T.createElement("span");
    n.className = "text", n.textContent = t.topic, e.appendChild(n), e.text = n;
  }
  if (t.hyperLink) {
    const n = T.createElement("a");
    n.className = "hyper-link", n.target = "_blank", n.innerText = "🔗", n.href = t.hyperLink, e.appendChild(n), e.link = n;
  } else
    e.link && (e.link = void 0);
  if (t.icons && t.icons.length) {
    const n = T.createElement("span");
    n.className = "icons", n.innerHTML = t.icons.map((o) => `<span>${ie(o)}</span>`).join(""), e.appendChild(n), e.icons = n;
  } else
    e.icons && (e.icons = void 0);
  if (t.tags && t.tags.length) {
    const n = T.createElement("div");
    n.className = "tags", n.innerHTML = t.tags.map((o) => `<span>${ie(o)}</span>`).join(""), e.appendChild(n), e.tags = n;
  } else
    e.tags && (e.tags = void 0);
}, lt = function(e, t) {
  const n = T.createElement("me-wrapper"), { p: o, tpc: i } = this.createParent(e);
  if (n.appendChild(o), !t && e.children && e.children.length > 0) {
    const s = ve(e.expanded);
    if (o.appendChild(s), e.expanded !== !1) {
      const r = ct(this, e.children);
      n.appendChild(r);
    }
  }
  return { grp: n, top: o, tpc: i };
}, at = function(e) {
  const t = T.createElement("me-parent"), n = this.createTopic(e);
  return ge(n, e), t.appendChild(n), { p: t, tpc: n };
}, dt = function(e) {
  const t = T.createElement("me-children");
  return t.append(...e), t;
}, ht = function(e) {
  const t = T.createElement("me-tpc");
  return t.nodeObj = e, t.dataset.nodeid = "me" + e.id, t.draggable = this.draggable, t;
};
function ze(e) {
  const t = T.createRange();
  t.selectNodeContents(e);
  const n = window.getSelection();
  n && (n.removeAllRanges(), n.addRange(t));
}
const ut = function(e) {
  if (!e)
    return;
  const t = T.createElement("div"), n = e.text.textContent;
  e.appendChild(t), t.id = "input-box", t.textContent = n, t.contentEditable = "plaintext-only", t.spellcheck = !1;
  const o = getComputedStyle(e);
  t.style.cssText = `min-width:${e.offsetWidth - 8}px;
  color:${o.color};
  padding:${o.padding};
  margin:${o.margin};
  font:${o.font};
  background-color:${o.backgroundColor !== "rgba(0, 0, 0, 0)" && o.backgroundColor};
  border-radius:${o.borderRadius};`, this.direction === $ && (t.style.right = "0"), t.focus(), ze(t), this.bus.fire("operation", {
    name: "beginEdit",
    obj: e.nodeObj
  }), t.addEventListener("keydown", (i) => {
    i.stopPropagation();
    const s = i.key;
    if (s === "Enter" || s === "Tab") {
      if (i.shiftKey)
        return;
      i.preventDefault(), t.blur(), this.map.focus();
    }
  }), t.addEventListener("blur", () => {
    var r;
    if (!t)
      return;
    const i = e.nodeObj, s = ((r = t.textContent) == null ? void 0 : r.trim()) || "";
    s === "" ? i.topic = n : i.topic = s, t.remove(), s !== n && (e.text.textContent = i.topic, this.linkDiv(), this.bus.fire("operation", {
      name: "finishEdit",
      obj: i,
      origin: n
    }));
  });
}, ve = function(e) {
  const t = T.createElement("me-epd");
  return t.expanded = e !== !1, t.className = e !== !1 ? "minus" : "", t;
}, K = document, Z = "http://www.w3.org/2000/svg", Fe = function(e, t, n) {
  const o = K.createElementNS(Z, "path");
  return C(o, {
    d: e,
    stroke: t || "#666",
    fill: "none",
    "stroke-width": n
  }), o;
}, J = function(e) {
  const t = K.createElementNS(Z, "svg");
  return t.setAttribute("class", e), t.setAttribute("overflow", "visible"), t;
}, Ne = function() {
  const e = K.createElementNS(Z, "line");
  return e.setAttribute("stroke", "#bbb"), e.setAttribute("fill", "none"), e.setAttribute("stroke-width", "2"), e;
}, ft = function(e, t, n) {
  const o = {
    stroke: "rgb(235, 95, 82)",
    fill: "none",
    "stroke-linecap": "cap",
    "stroke-width": "2"
  }, i = K.createElementNS(Z, "g");
  return [e, t, n].forEach((s, r) => {
    const c = K.createElementNS(Z, "path"), l = {
      d: s,
      ...o
    };
    C(c, l), r === 0 && c.setAttribute("stroke-dasharray", "8,2"), i.appendChild(c);
  }), i;
}, qe = function(e, t, n) {
  if (!t)
    return;
  const o = K.createElement("div");
  e.nodes.appendChild(o);
  const i = t.innerHTML;
  o.id = "input-box", o.textContent = i, o.contentEditable = "plaintext-only", o.spellcheck = !1;
  const s = t.getBBox();
  o.style.cssText = `
    min-width:${Math.max(88, s.width)}px;
    position:absolute;
    left:${s.x}px;
    top:${s.y}px;
    padding: 2px 4px;
    margin: -2px -4px; 
  `, o.focus(), ze(o), o.addEventListener("keydown", (r) => {
    r.stopPropagation();
    const c = r.key;
    if (c === "Enter" || c === "Tab") {
      if (r.shiftKey)
        return;
      r.preventDefault(), o.blur(), e.map.focus();
    }
  }), o.addEventListener("blur", () => {
    o && n(o);
  });
}, pt = function(e) {
  const t = this.map.querySelector("me-root"), n = t.offsetTop, o = t.offsetLeft, i = t.offsetWidth, s = t.offsetHeight, c = this.map.querySelector("me-nodes").offsetWidth;
  this.nodes.style.top = `${1e4 - this.nodes.offsetHeight / 2}px`, this.alignment === "root" ? this.nodes.style.left = `${1e4 - o - i / 2}px` : this.nodes.style.left = `${1e4 - c / 2}px`;
  const l = this.map.querySelectorAll("me-main > me-wrapper");
  this.lines.innerHTML = "";
  for (let d = 0; d < l.length; d++) {
    const a = l[d], u = a.querySelector("me-tpc"), { offsetLeft: h, offsetTop: p } = R(this.nodes, u), g = u.offsetWidth, v = u.offsetHeight, m = a.parentNode.className, f = this.generateMainBranch({ pT: n, pL: o, pW: i, pH: s, cT: p, cL: h, cW: g, cH: v, direction: m, containerHeight: this.nodes.offsetHeight }), b = this.theme.palette, x = u.nodeObj.branchColor || b[d % b.length];
    u.style.borderColor = x, this.lines.appendChild(Fe(f, x, "3"));
    const E = a.children[0].children[1];
    if (E && (E.style.top = (E.parentNode.offsetHeight - E.offsetHeight) / 2 + "px", m === L.LHS ? E.style.left = "-10px" : E.style.right = "-10px"), e && e !== a)
      continue;
    const y = J("subLines"), w = a.lastChild;
    w.tagName === "svg" && w.remove(), a.appendChild(y), Ve(this, y, x, a, m, !0);
  }
  this.renderArrow(), this.renderSummary(), this.bus.fire("linkDiv");
}, Ve = function(e, t, n, o, i, s) {
  const r = o.firstChild, c = o.children[1].children;
  if (c.length === 0)
    return;
  const l = r.offsetTop, d = r.offsetLeft, a = r.offsetWidth, u = r.offsetHeight;
  for (let h = 0; h < c.length; h++) {
    const p = c[h], g = p.firstChild, v = g.offsetTop, m = g.offsetLeft, f = g.offsetWidth, b = g.offsetHeight, x = g.firstChild.nodeObj.branchColor || n, E = e.generateSubBranch({ pT: l, pL: d, pW: a, pH: u, cT: v, cL: m, cW: f, cH: b, direction: i, isFirst: s });
    t.appendChild(Fe(E, x, "2"));
    const y = g.children[1];
    if (y) {
      if (y.style.bottom = -(y.offsetHeight / 2) + "px", i === L.LHS ? y.style.left = "10px" : i === L.RHS && (y.style.right = "10px"), !y.expanded)
        continue;
    } else
      continue;
    Ve(e, t, x, p, i);
  }
}, Ce = {
  addChild: "插入子节点",
  addParent: "插入父节点",
  addSibling: "插入同级节点",
  removeNode: "删除节点",
  focus: "专注",
  cancelFocus: "取消专注",
  moveUp: "上移",
  moveDown: "下移",
  link: "连接",
  clickTips: "请点击目标节点",
  summary: "摘要"
}, Se = {
  cn: Ce,
  zh_CN: Ce,
  zh_TW: {
    addChild: "插入子節點",
    addParent: "插入父節點",
    addSibling: "插入同級節點",
    removeNode: "刪除節點",
    focus: "專注",
    cancelFocus: "取消專注",
    moveUp: "上移",
    moveDown: "下移",
    link: "連接",
    clickTips: "請點擊目標節點",
    summary: "摘要"
  },
  en: {
    addChild: "Add child",
    addParent: "Add parent",
    addSibling: "Add sibling",
    removeNode: "Remove node",
    focus: "Focus Mode",
    cancelFocus: "Cancel Focus Mode",
    moveUp: "Move up",
    moveDown: "Move down",
    link: "Link",
    clickTips: "Please click the target node",
    summary: "Summary"
  },
  ru: {
    addChild: "Добавить дочерний элемент",
    addParent: "Добавить родительский элемент",
    addSibling: "Добавить на этом уровне",
    removeNode: "Удалить узел",
    focus: "Режим фокусировки",
    cancelFocus: "Отменить режим фокусировки",
    moveUp: "Поднять выше",
    moveDown: "Опустить ниже",
    link: "Ссылка",
    clickTips: "Пожалуйста, нажмите на целевой узел",
    summary: "Описание"
  },
  ja: {
    addChild: "子ノードを追加する",
    addParent: "親ノードを追加します",
    addSibling: "兄弟ノードを追加する",
    removeNode: "ノードを削除",
    focus: "集中",
    cancelFocus: "集中解除",
    moveUp: "上へ移動",
    moveDown: "下へ移動",
    link: "コネクト",
    clickTips: "ターゲットノードをクリックしてください",
    summary: "概要"
  },
  pt: {
    addChild: "Adicionar item filho",
    addParent: "Adicionar item pai",
    addSibling: "Adicionar item irmao",
    removeNode: "Remover item",
    focus: "Modo Foco",
    cancelFocus: "Cancelar Modo Foco",
    moveUp: "Mover para cima",
    moveDown: "Mover para baixo",
    link: "Link",
    clickTips: "Favor clicar no item alvo",
    summary: "Resumo"
  },
  it: {
    addChild: "Aggiungi figlio",
    addParent: "Aggiungi genitore",
    addSibling: "Aggiungi fratello",
    removeNode: "Rimuovi nodo",
    focus: "Modalità Focus",
    cancelFocus: "Annulla Modalità Focus",
    moveUp: "Sposta su",
    moveDown: "Sposta giù",
    link: "Collega",
    clickTips: "Si prega di fare clic sul nodo di destinazione",
    summary: "Unisci nodi"
  },
  es: {
    addChild: "Agregar hijo",
    addParent: "Agregar padre",
    addSibling: "Agregar hermano",
    removeNode: "Eliminar nodo",
    focus: "Modo Enfoque",
    cancelFocus: "Cancelar Modo Enfoque",
    moveUp: "Mover hacia arriba",
    moveDown: "Mover hacia abajo",
    link: "Enlace",
    clickTips: "Por favor haga clic en el nodo de destino",
    summary: "Resumen"
  },
  fr: {
    addChild: "Ajout enfant",
    addParent: "Ajout parent",
    addSibling: "Ajout voisin",
    removeNode: "Supprimer",
    focus: "Cibler",
    cancelFocus: "Retour",
    moveUp: "Monter",
    moveDown: "Descendre",
    link: "Lier",
    clickTips: "Cliquer sur le noeud cible",
    summary: "Annoter"
  },
  ko: {
    addChild: "자식 추가",
    addParent: "부모 추가",
    addSibling: "형제 추가",
    removeNode: "노드 삭제",
    focus: "포커스 모드",
    cancelFocus: "포커스 모드 취소",
    moveUp: "위로 이동",
    moveDown: "아래로 이동",
    link: "연결",
    clickTips: "대상 노드를 클릭하십시오",
    summary: "요약"
  }
};
function mt(e, t) {
  const n = (y) => {
    const w = document.createElement("div");
    return w.innerText = y, w.className = "tips", w;
  }, o = (y, w, _) => {
    const M = document.createElement("li");
    return M.id = y, M.innerHTML = `<span>${ie(w)}</span><span ${_ ? 'class="key"' : ""}>${ie(_)}</span>`, M;
  }, i = Se[e.locale] ? e.locale : "en", s = Se[i], r = o("cm-add_child", s.addChild, "Tab"), c = o("cm-add_parent", s.addParent, "Ctrl + Enter"), l = o("cm-add_sibling", s.addSibling, "Enter"), d = o("cm-remove_child", s.removeNode, "Delete"), a = o("cm-fucus", s.focus, ""), u = o("cm-unfucus", s.cancelFocus, ""), h = o("cm-up", s.moveUp, "PgUp"), p = o("cm-down", s.moveDown, "Pgdn"), g = o("cm-link", s.link, ""), v = o("cm-link-bidirectional", "Bidreactional Link", ""), m = o("cm-summary", s.summary, ""), f = document.createElement("ul");
  if (f.className = "menu-list", f.appendChild(r), f.appendChild(c), f.appendChild(l), f.appendChild(d), (!t || t.focus) && (f.appendChild(a), f.appendChild(u)), f.appendChild(h), f.appendChild(p), f.appendChild(m), (!t || t.link) && (f.appendChild(g), f.appendChild(v)), t && t.extend)
    for (let y = 0; y < t.extend.length; y++) {
      const w = t.extend[y], _ = o(w.name, w.name, w.key || "");
      f.appendChild(_), _.onclick = (M) => {
        w.onclick(M);
      };
    }
  const b = document.createElement("div");
  b.className = "context-menu", b.appendChild(f), b.hidden = !0, e.container.append(b);
  let x = !0;
  e.container.oncontextmenu = function(y) {
    if (y.preventDefault(), !e.editable || k.moved)
      return;
    const w = y.target;
    if (he(w)) {
      w.parentElement.tagName === "ME-ROOT" ? x = !0 : x = !1, x ? (a.className = "disabled", h.className = "disabled", p.className = "disabled", c.className = "disabled", l.className = "disabled", d.className = "disabled") : (a.className = "", h.className = "", p.className = "", c.className = "", l.className = "", d.className = ""), e.currentNodes || e.selectNode(w), b.hidden = !1, k.mousedown && (k.mousedown = !1), f.style.top = "", f.style.bottom = "", f.style.left = "", f.style.right = "";
      const _ = f.getBoundingClientRect(), M = f.offsetHeight, j = f.offsetWidth, z = y.clientY - _.top, X = y.clientX - _.left;
      M + z > window.innerHeight ? (f.style.top = "", f.style.bottom = "0px") : (f.style.bottom = "", f.style.top = z + 15 + "px"), j + X > window.innerWidth ? (f.style.left = "", f.style.right = "0px") : (f.style.right = "", f.style.left = X + 10 + "px");
    }
  }, b.onclick = (y) => {
    y.target === b && (b.hidden = !0);
  }, r.onclick = () => {
    e.addChild(), b.hidden = !0;
  }, c.onclick = () => {
    e.insertParent(), b.hidden = !0;
  }, l.onclick = () => {
    x || (e.insertSibling("after"), b.hidden = !0);
  }, d.onclick = () => {
    x || (e.removeNode(), b.hidden = !0);
  }, a.onclick = () => {
    x || (e.focusNode(e.currentNode), b.hidden = !0);
  }, u.onclick = () => {
    e.cancelFocus(), b.hidden = !0;
  }, h.onclick = () => {
    x || (e.moveUpNode(), b.hidden = !0);
  }, p.onclick = () => {
    x || (e.moveDownNode(), b.hidden = !0);
  };
  const E = (y) => {
    b.hidden = !0;
    const w = e.currentNode, _ = n(s.clickTips);
    e.container.appendChild(_), e.map.addEventListener(
      "click",
      (M) => {
        M.preventDefault(), _.remove();
        const j = M.target;
        (j.parentElement.tagName === "ME-PARENT" || j.parentElement.tagName === "ME-ROOT") && e.createArrow(w, j, y);
      },
      {
        once: !0
      }
    );
  };
  return g.onclick = () => E(), v.onclick = () => E({ bidirectional: !0 }), m.onclick = () => {
    b.hidden = !0, e.createSummary(), e.unselectNodes();
  }, () => {
    r.onclick = null, c.onclick = null, l.onclick = null, d.onclick = null, a.onclick = null, u.onclick = null, h.onclick = null, p.onclick = null, g.onclick = null, m.onclick = null, b.onclick = null, e.container.oncontextmenu = null;
  };
}
const gt = (e) => {
  const t = e.map.querySelectorAll(".lhs>me-wrapper>me-parent>me-tpc");
  e.selectNode(t[Math.ceil(t.length / 2) - 1]);
}, vt = (e) => {
  const t = e.map.querySelectorAll(".rhs>me-wrapper>me-parent>me-tpc");
  e.selectNode(t[Math.ceil(t.length / 2) - 1]);
}, bt = (e) => {
  e.selectNode(e.map.querySelector("me-root>me-tpc"));
}, yt = function(e, t) {
  const n = t.parentElement.parentElement.parentElement.previousSibling;
  if (n) {
    const o = n.firstChild;
    e.selectNode(o);
  }
}, xt = function(e, t) {
  const n = t.parentElement.nextSibling;
  if (n && n.firstChild) {
    const o = n.firstChild.firstChild.firstChild;
    e.selectNode(o);
  }
}, _e = function(e, t) {
  var s, r;
  const n = e.currentNode || ((s = e.currentNodes) == null ? void 0 : s[0]);
  if (!n)
    return;
  const o = n.nodeObj, i = n.offsetParent.offsetParent.parentElement;
  o.parent ? i.className === t ? xt(e, n) : (r = o.parent) != null && r.parent ? yt(e, n) : bt(e) : t === L.LHS ? gt(e) : vt(e);
}, Le = function(e, t) {
  var r;
  const n = e.currentNode || ((r = e.currentNodes) == null ? void 0 : r[0]);
  if (!n || !n.nodeObj.parent)
    return;
  const i = t + "Sibling", s = n.parentElement.parentElement[i];
  s && e.selectNode(s.firstChild.firstChild);
}, ee = function(e, t) {
  switch (t) {
    case "in":
      if (e.scaleVal > 1.6)
        return;
      e.scale(e.scaleVal += 0.2);
      break;
    case "out":
      if (e.scaleVal < 0.6)
        return;
      e.scale(e.scaleVal -= 0.2);
  }
};
function wt(e) {
  const t = () => {
    e.currentArrow ? e.removeArrow() : e.currentSummary ? e.removeSummary(e.currentSummary.summaryObj.id) : e.currentNode ? e.removeNode() : e.currentNodes && e.removeNodes(e.currentNodes);
  }, n = {
    Enter: (o) => {
      o.shiftKey ? e.insertSibling("before") : o.ctrlKey ? e.insertParent() : e.insertSibling("after");
    },
    Tab: () => {
      e.addChild();
    },
    F1: () => {
      e.toCenter();
    },
    F2: () => {
      e.beginEdit();
    },
    ArrowUp: (o) => {
      if (o.altKey)
        e.moveUpNode();
      else {
        if (o.metaKey || o.ctrlKey)
          return e.initSide();
        Le(e, "previous");
      }
    },
    ArrowDown: (o) => {
      o.altKey ? e.moveDownNode() : Le(e, "next");
    },
    ArrowLeft: (o) => {
      if (o.metaKey || o.ctrlKey)
        return e.initLeft();
      _e(e, L.LHS);
    },
    ArrowRight: (o) => {
      if (o.metaKey || o.ctrlKey)
        return e.initRight();
      _e(e, L.RHS);
    },
    PageUp: () => e.moveUpNode(),
    PageDown: () => {
      e.moveDownNode();
    },
    c: (o) => {
      (o.metaKey || o.ctrlKey) && (e.currentNode ? e.waitCopy = [e.currentNode] : e.currentNodes && (e.waitCopy = e.currentNodes));
    },
    x: (o) => {
      (o.metaKey || o.ctrlKey) && (e.currentNode ? e.waitCopy = [e.currentNode] : e.currentNodes && (e.waitCopy = e.currentNodes), t());
    },
    v: (o) => {
      !e.waitCopy || !e.currentNode || (o.metaKey || o.ctrlKey) && (e.waitCopy.length === 1 ? e.copyNode(e.waitCopy[0], e.currentNode) : e.copyNodes(e.waitCopy, e.currentNode));
    },
    "+": (o) => {
      (o.metaKey || o.ctrlKey) && ee(e, "in");
    },
    "-": (o) => {
      (o.metaKey || o.ctrlKey) && ee(e, "out");
    },
    0: (o) => {
      (o.metaKey || o.ctrlKey) && e.scale(1);
    },
    Delete: t,
    Backspace: t
  };
  e.map.onkeydown = (o) => {
    if (o.preventDefault(), !e.editable || o.target !== o.currentTarget)
      return;
    const i = n[o.key];
    i && i(o);
  }, e.map.onwheel = (o) => {
    (o.ctrlKey || o.metaKey) && (o.preventDefault(), o.deltaY < 0 ? ee(e, "in") : e.scaleVal - 0.2 > 0 && ee(e, "out"), o.stopPropagation());
  };
}
const ue = document, Et = function(e, t) {
  if (!t)
    return fe(e), e;
  let n = e.querySelector(".insert-preview");
  const o = `insert-preview ${t} show`;
  return n || (n = ue.createElement("div"), e.appendChild(n)), n.className = o, e;
}, fe = function(e) {
  if (!e)
    return;
  const t = e.querySelectorAll(".insert-preview");
  for (const n of t || [])
    n.remove();
}, Me = function(e, t) {
  for (const n of t) {
    const o = n.parentElement.parentElement.contains(e);
    if (!(e && e.tagName === "ME-TPC" && e !== n && !o && e.nodeObj.parent))
      return !1;
  }
  return !0;
}, Nt = function(e) {
  const t = document.createElement("div");
  return t.className = "mind-elixir-ghost", e.map.appendChild(t), t;
};
function Ct(e) {
  let t = null, n = null, o = null;
  const i = Nt(e), s = 12;
  e.map.addEventListener("dragstart", (r) => {
    var l;
    const c = r.target;
    if ((c == null ? void 0 : c.tagName) !== "ME-TPC") {
      r.preventDefault();
      return;
    }
    (l = e.currentNodes) != null && l.includes(c) || (e.unselectNodes(), e.selectNode(c)), e.currentNodes ? (t = e.currentNodes, i.innerHTML = e.currentNodes.length + "") : (t = [c], i.innerHTML = c.innerHTML);
    for (const d of t)
      d.parentElement.parentElement.style.opacity = "0.5";
    r.dataTransfer.setDragImage(i, 0, 0), r.dataTransfer.dropEffect = "move", k.clear();
  }), e.map.addEventListener("dragend", async (r) => {
    if (!t)
      return;
    for (const l of t)
      l.parentElement.parentElement.style.opacity = "1";
    const c = r.target;
    c.style.opacity = "", o && (fe(o), n === "before" ? e.moveNodeBefore(t, o) : n === "after" ? e.moveNodeAfter(t, o) : n === "in" && e.moveNodeIn(t, o), t = null);
  }), e.map.addEventListener("dragover", function(r) {
    if (r.preventDefault(), !t)
      return;
    fe(o);
    const c = ue.elementFromPoint(r.clientX, r.clientY - s);
    if (Me(c, t)) {
      o = c;
      const l = c.getBoundingClientRect().y;
      r.clientY > l + c.clientHeight ? n = "after" : n = "in";
    } else {
      const l = ue.elementFromPoint(r.clientX, r.clientY + s);
      if (Me(l, t)) {
        o = l;
        const d = l.getBoundingClientRect().y;
        r.clientY < d ? n = "before" : n = "in";
      } else
        n = o = null;
    }
    o && Et(o, n);
  });
}
const St = function(e) {
  return ["createSummary", "removeSummary", "finishEditSummary"].includes(e.name) ? {
    type: "summary",
    value: e.obj.id
  } : ["createArrow", "removeArrow", "finishEditArrowLabel"].includes(e.name) ? {
    type: "arrow",
    value: e.obj.id
  } : ["removeNodes", "copyNodes", "moveNodeBefore", "moveNodeAfter", "moveNodeIn"].includes(e.name) ? {
    type: "nodes",
    value: e.objs.map((t) => t.id)
  } : {
    type: "node",
    value: e.obj.id
  };
};
function _t(e) {
  let t = [], n = -1, o = e.getData();
  e.bus.addListener("operation", (i) => {
    if (i.name === "beginEdit")
      return;
    t = t.slice(0, n + 1);
    const s = e.getData();
    t.push({ prev: o, currentObject: St(i), next: s }), o = s, n = t.length - 1;
  }), e.undo = function() {
    if (n > -1) {
      const i = t[n];
      o = i.prev, e.refresh(i.prev);
      try {
        i.currentObject.type === "node" ? e.selectNode(S(i.currentObject.value)) : i.currentObject.type === "nodes" && e.selectNodes(i.currentObject.value.map((s) => S(s)));
      } catch {
      } finally {
        n--;
      }
    }
  }, e.redo = function() {
    if (n < t.length - 1) {
      n++;
      const i = t[n];
      o = i.next, e.refresh(i.next), i.currentObject.type === "node" ? e.selectNode(S(i.currentObject.value)) : i.currentObject.type === "nodes" && e.selectNodes(i.currentObject.value.map((s) => S(s)));
    }
  }, e.map.addEventListener("keydown", (i) => {
    (i.metaKey || i.ctrlKey) && (i.shiftKey && i.key === "Z" || i.key === "y") ? e.redo() : (i.metaKey || i.ctrlKey) && i.key === "z" && e.undo();
  });
}
const q = (e, t) => {
  const n = document.createElement("span");
  return n.id = e, n.innerHTML = `<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-${t}"></use>
  </svg>`, n;
};
function Lt(e) {
  const t = document.createElement("div"), n = q("fullscreen", "full"), o = q("toCenter", "living"), i = q("zoomout", "move"), s = q("zoomin", "add"), r = document.createElement("span");
  return r.innerText = "100%", t.appendChild(n), t.appendChild(o), t.appendChild(i), t.appendChild(s), t.className = "mind-elixir-toolbar rb", n.onclick = () => {
    e.mindElixirBox.requestFullscreen();
  }, o.onclick = () => {
    e.toCenter();
  }, i.onclick = () => {
    e.scaleVal < 0.6 || e.scale(e.scaleVal - 0.2);
  }, s.onclick = () => {
    e.scaleVal > 1.6 || e.scale(e.scaleVal + 0.2);
  }, t;
}
function Mt(e) {
  const t = document.createElement("div"), n = q("tbltl", "left"), o = q("tbltr", "right"), i = q("tblts", "side");
  return t.appendChild(n), t.appendChild(o), t.appendChild(i), t.className = "mind-elixir-toolbar lt", n.onclick = () => {
    e.initLeft();
  }, o.onclick = () => {
    e.initRight();
  }, i.onclick = () => {
    e.initSide();
  }, t;
}
function kt(e) {
  e.container.append(Lt(e)), e.container.append(Mt(e));
}
/*! @viselect/vanilla v3.5.1 MIT | https://github.com/Simonwep/selection/tree/master/packages/vanilla */
var Tt = Object.defineProperty, At = (e, t, n) => t in e ? Tt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, N = (e, t, n) => (At(e, typeof t != "symbol" ? t + "" : t, n), n);
class $t {
  constructor() {
    N(this, "_listeners", /* @__PURE__ */ new Map()), N(this, "on", this.addEventListener), N(this, "off", this.removeEventListener), N(this, "emit", this.dispatchEvent);
  }
  addEventListener(t, n) {
    const o = this._listeners.get(t) ?? /* @__PURE__ */ new Set();
    return this._listeners.set(t, o), o.add(n), this;
  }
  removeEventListener(t, n) {
    var o;
    return (o = this._listeners.get(t)) == null || o.delete(n), this;
  }
  dispatchEvent(t, ...n) {
    let o = !0;
    for (const i of this._listeners.get(t) ?? [])
      o = i(...n) !== !1 && o;
    return o;
  }
  unbindAllListeners() {
    this._listeners.clear();
  }
}
const ke = (e, t = "px") => typeof e == "number" ? e + t : e;
function O({ style: e }, t, n) {
  if (typeof t == "object")
    for (const [o, i] of Object.entries(t))
      i !== void 0 && (e[o] = ke(i));
  else
    n !== void 0 && (e[t] = ke(n));
}
const We = (e) => (t, n, o, i = {}) => {
  t instanceof HTMLCollection || t instanceof NodeList ? t = Array.from(t) : Array.isArray(t) || (t = [t]), Array.isArray(n) || (n = [n]);
  for (const s of t)
    if (s)
      for (const r of n)
        s[e](r, o, { capture: !1, ...i });
  return [t, n, o, i];
}, V = We("addEventListener"), H = We("removeEventListener"), te = (e) => {
  var t;
  const { clientX: n, clientY: o, target: i } = ((t = e.touches) == null ? void 0 : t[0]) ?? e;
  return { x: n, y: o, target: i };
};
function Te(e, t, n = "touch") {
  switch (n) {
    case "center": {
      const o = t.left + t.width / 2, i = t.top + t.height / 2;
      return o >= e.left && o <= e.right && i >= e.top && i <= e.bottom;
    }
    case "cover":
      return t.left >= e.left && t.top >= e.top && t.right <= e.right && t.bottom <= e.bottom;
    case "touch":
      return e.right >= t.left && e.left <= t.right && e.bottom >= t.top && e.top <= t.bottom;
  }
}
function W(e, t = document) {
  const n = Array.isArray(e) ? e : [e];
  let o = [];
  for (let i = 0, s = n.length; i < s; i++) {
    const r = n[i];
    typeof r == "string" ? o = o.concat(Array.from(t.querySelectorAll(r))) : r instanceof Element && o.push(r);
  }
  return o;
}
const jt = () => matchMedia("(hover: none), (pointer: coarse)").matches, Dt = () => "safari" in window, Ot = (e) => {
  let t, n = -1, o = !1;
  return {
    next(...i) {
      t = i, o || (o = !0, n = requestAnimationFrame(() => {
        e(...t), o = !1;
      }));
    },
    cancel() {
      cancelAnimationFrame(n), o = !1;
    }
  };
};
function Ht(e, t) {
  for (const n of t) {
    if (typeof n == "number")
      return e.button === n;
    if (typeof n == "object") {
      const o = n.button === e.button, i = n.modifiers.every((s) => {
        switch (s) {
          case "alt":
            return e.altKey;
          case "ctrl":
            return e.ctrlKey || e.metaKey;
          case "shift":
            return e.shiftKey;
        }
      });
      return o && i;
    }
  }
  return !1;
}
const { abs: F, max: Ae, min: $e, ceil: je } = Math;
class Ie extends $t {
  constructor(t) {
    var n, o, i, s, r;
    super(), N(this, "_options"), N(this, "_selection", {
      stored: [],
      selected: [],
      touched: [],
      changed: {
        added: [],
        // Added elements since last selection
        removed: []
        // Removed elements since last selection
      }
    }), N(this, "_area"), N(this, "_clippingElement"), N(this, "_targetElement"), N(this, "_targetRect"), N(this, "_selectables", []), N(this, "_latestElement"), N(this, "_areaRect", new DOMRect()), N(this, "_areaLocation", { y1: 0, x2: 0, y2: 0, x1: 0 }), N(this, "_singleClick", !0), N(this, "_frame"), N(this, "_scrollAvailable", !0), N(this, "_scrollingActive", !1), N(this, "_scrollSpeed", { x: 0, y: 0 }), N(this, "_scrollDelta", { x: 0, y: 0 }), N(this, "disable", this._bindStartEvents.bind(this, !1)), N(this, "enable", this._bindStartEvents), this._options = {
      selectionAreaClass: "selection-area",
      selectionContainerClass: void 0,
      selectables: [],
      document: window.document,
      startAreas: ["html"],
      boundaries: ["html"],
      container: "body",
      ...t,
      behaviour: {
        overlap: "invert",
        intersect: "touch",
        triggers: [0],
        ...t.behaviour,
        startThreshold: (n = t.behaviour) != null && n.startThreshold ? typeof t.behaviour.startThreshold == "number" ? t.behaviour.startThreshold : { x: 10, y: 10, ...t.behaviour.startThreshold } : { x: 10, y: 10 },
        scrolling: {
          speedDivider: 10,
          manualSpeed: 750,
          ...(o = t.behaviour) == null ? void 0 : o.scrolling,
          startScrollMargins: {
            x: 0,
            y: 0,
            ...(s = (i = t.behaviour) == null ? void 0 : i.scrolling) == null ? void 0 : s.startScrollMargins
          }
        }
      },
      features: {
        range: !0,
        touch: !0,
        ...t.features,
        singleTap: {
          allow: !0,
          intersect: "native",
          ...(r = t.features) == null ? void 0 : r.singleTap
        }
      }
    };
    for (const a of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))
      typeof this[a] == "function" && (this[a] = this[a].bind(this));
    const { document: c, selectionAreaClass: l, selectionContainerClass: d } = this._options;
    this._area = c.createElement("div"), this._clippingElement = c.createElement("div"), this._clippingElement.appendChild(this._area), this._area.classList.add(l), d && this._clippingElement.classList.add(d), O(this._area, {
      willChange: "top, left, bottom, right, width, height",
      top: 0,
      left: 0,
      position: "fixed"
    }), O(this._clippingElement, {
      overflow: "hidden",
      position: "fixed",
      transform: "translate3d(0, 0, 0)",
      // https://stackoverflow.com/a/38268846
      pointerEvents: "none",
      zIndex: "1"
    }), this._frame = Ot((a) => {
      this._recalculateSelectionAreaRect(), this._updateElementSelection(), this._emitEvent("move", a), this._redrawSelectionArea();
    }), this.enable();
  }
  _bindStartEvents(t = !0) {
    const { document: n, features: o } = this._options, i = t ? V : H;
    i(n, "mousedown", this._onTapStart), o.touch && i(n, "touchstart", this._onTapStart, {
      passive: !1
    });
  }
  _onTapStart(t, n = !1) {
    const { x: o, y: i, target: s } = te(t), { _options: r } = this, { document: c } = this._options, l = s.getBoundingClientRect();
    if (t instanceof MouseEvent && !Ht(t, r.behaviour.triggers))
      return;
    const d = W(r.startAreas, r.document), a = W(r.boundaries, r.document);
    this._targetElement = a.find(
      (p) => Te(p.getBoundingClientRect(), l)
    );
    const u = t.composedPath();
    if (!this._targetElement || !d.find((p) => u.includes(p)) || !a.find((p) => u.includes(p)) || !n && this._emitEvent("beforestart", t) === !1)
      return;
    this._areaLocation = { x1: o, y1: i, x2: 0, y2: 0 };
    const h = c.scrollingElement ?? c.body;
    this._scrollDelta = { x: h.scrollLeft, y: h.scrollTop }, this._singleClick = !0, this.clearSelection(!1, !0), V(c, ["touchmove", "mousemove"], this._delayedTapMove, { passive: !1 }), V(c, ["mouseup", "touchcancel", "touchend"], this._onTapStop), V(c, "scroll", this._onScroll);
  }
  _onSingleTap(t) {
    const { singleTap: { intersect: n }, range: o } = this._options.features, i = te(t);
    let s;
    if (n === "native")
      s = i.target;
    else if (n === "touch") {
      this.resolveSelectables();
      const { x: c, y: l } = i;
      s = this._selectables.find((d) => {
        const { right: a, left: u, top: h, bottom: p } = d.getBoundingClientRect();
        return c < a && c > u && l < p && l > h;
      });
    }
    if (!s)
      return;
    for (this.resolveSelectables(); !this._selectables.includes(s); ) {
      if (!s.parentElement)
        return;
      s = s.parentElement;
    }
    const { stored: r } = this._selection;
    if (this._emitEvent("start", t), t.shiftKey && o && this._latestElement) {
      const c = this._latestElement, [l, d] = c.compareDocumentPosition(s) & 4 ? [s, c] : [c, s], a = [...this._selectables.filter(
        (u) => u.compareDocumentPosition(l) & 4 && u.compareDocumentPosition(d) & 2
      ), l, d];
      this.select(a), this._latestElement = c;
    } else
      r.includes(s) && (r.length === 1 || t.ctrlKey || r.every((c) => this._selection.stored.includes(c))) ? this.deselect(s) : (this.select(s), this._latestElement = s);
  }
  _delayedTapMove(t) {
    const { container: n, document: o, behaviour: { startThreshold: i } } = this._options, { x1: s, y1: r } = this._areaLocation, { x: c, y: l } = te(t);
    if (
      // Single number for both coordinates
      typeof i == "number" && F(c + l - (s + r)) >= i || // Different x and y threshold
      typeof i == "object" && F(c - s) >= i.x || F(l - r) >= i.y
    ) {
      if (H(o, ["mousemove", "touchmove"], this._delayedTapMove, { passive: !1 }), this._emitEvent("beforedrag", t) === !1) {
        H(o, ["mouseup", "touchcancel", "touchend"], this._onTapStop);
        return;
      }
      V(o, ["mousemove", "touchmove"], this._onTapMove, { passive: !1 }), O(this._area, "display", "block"), W(n, o)[0].appendChild(this._clippingElement), this.resolveSelectables(), this._singleClick = !1, this._targetRect = this._targetElement.getBoundingClientRect(), this._scrollAvailable = this._targetElement.scrollHeight !== this._targetElement.clientHeight || this._targetElement.scrollWidth !== this._targetElement.clientWidth, this._scrollAvailable && (V(this._targetElement, "wheel", this._manualScroll, { passive: !1 }), this._selectables = this._selectables.filter((d) => this._targetElement.contains(d))), this._setupSelectionArea(), this._emitEvent("start", t), this._onTapMove(t);
    }
    this._handleMoveEvent(t);
  }
  _setupSelectionArea() {
    const { _clippingElement: t, _targetElement: n, _area: o } = this, i = this._targetRect = n.getBoundingClientRect();
    this._scrollAvailable ? (O(t, {
      top: i.top,
      left: i.left,
      width: i.width,
      height: i.height
    }), O(o, {
      marginTop: -i.top,
      marginLeft: -i.left
    })) : (O(t, {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }), O(o, {
      marginTop: 0,
      marginLeft: 0
    }));
  }
  _onTapMove(t) {
    const { x: n, y: o } = te(t), { _scrollSpeed: i, _areaLocation: s, _options: r, _frame: c } = this, { speedDivider: l } = r.behaviour.scrolling, d = this._targetElement;
    if (s.x2 = n, s.y2 = o, this._scrollAvailable && !this._scrollingActive && (i.y || i.x)) {
      this._scrollingActive = !0;
      const a = () => {
        if (!i.x && !i.y) {
          this._scrollingActive = !1;
          return;
        }
        const { scrollTop: u, scrollLeft: h } = d;
        i.y && (d.scrollTop += je(i.y / l), s.y1 -= d.scrollTop - u), i.x && (d.scrollLeft += je(i.x / l), s.x1 -= d.scrollLeft - h), c.next(t), requestAnimationFrame(a);
      };
      requestAnimationFrame(a);
    } else
      c.next(t);
    this._handleMoveEvent(t);
  }
  _handleMoveEvent(t) {
    const { features: n } = this._options;
    (n.touch && jt() || this._scrollAvailable && Dt()) && t.preventDefault();
  }
  _onScroll() {
    const { _scrollDelta: t, _options: { document: n } } = this, { scrollTop: o, scrollLeft: i } = n.scrollingElement ?? n.body;
    this._areaLocation.x1 += t.x - i, this._areaLocation.y1 += t.y - o, t.x = i, t.y = o, this._setupSelectionArea(), this._frame.next(null);
  }
  _manualScroll(t) {
    const { manualSpeed: n } = this._options.behaviour.scrolling, o = t.deltaY ? t.deltaY > 0 ? 1 : -1 : 0, i = t.deltaX ? t.deltaX > 0 ? 1 : -1 : 0;
    this._scrollSpeed.y += o * n, this._scrollSpeed.x += i * n, this._onTapMove(t), t.preventDefault();
  }
  _recalculateSelectionAreaRect() {
    const { _scrollSpeed: t, _areaLocation: n, _areaRect: o, _targetElement: i, _options: s } = this, { scrollTop: r, scrollHeight: c, clientHeight: l, scrollLeft: d, scrollWidth: a, clientWidth: u } = i, h = this._targetRect, { x1: p, y1: g } = n;
    let { x2: v, y2: m } = n;
    const { behaviour: { scrolling: { startScrollMargins: f } } } = s;
    v < h.left + f.x ? (t.x = d ? -F(h.left - v + f.x) : 0, v = v < h.left ? h.left : v) : v > h.right - f.x ? (t.x = a - d - u ? F(h.left + h.width - v - f.x) : 0, v = v > h.right ? h.right : v) : t.x = 0, m < h.top + f.y ? (t.y = r ? -F(h.top - m + f.y) : 0, m = m < h.top ? h.top : m) : m > h.bottom - f.y ? (t.y = c - r - l ? F(h.top + h.height - m - f.y) : 0, m = m > h.bottom ? h.bottom : m) : t.y = 0;
    const b = $e(p, v), x = $e(g, m), E = Ae(p, v), y = Ae(g, m);
    o.x = b, o.y = x, o.width = E - b, o.height = y - x;
  }
  _redrawSelectionArea() {
    const { x: t, y: n, width: o, height: i } = this._areaRect, { style: s } = this._area;
    s.left = `${t}px`, s.top = `${n}px`, s.width = `${o}px`, s.height = `${i}px`;
  }
  _onTapStop(t, n) {
    var o;
    const { document: i, features: s } = this._options, { _singleClick: r } = this;
    H(i, ["mousemove", "touchmove"], this._delayedTapMove), H(i, ["touchmove", "mousemove"], this._onTapMove), H(i, ["mouseup", "touchcancel", "touchend"], this._onTapStop), H(i, "scroll", this._onScroll), this._keepSelection(), t && r && s.singleTap.allow ? this._onSingleTap(t) : !r && !n && (this._updateElementSelection(), this._emitEvent("stop", t)), this._scrollSpeed.x = 0, this._scrollSpeed.y = 0, H(this._targetElement, "wheel", this._manualScroll, { passive: !0 }), this._clippingElement.remove(), (o = this._frame) == null || o.cancel(), O(this._area, "display", "none");
  }
  _updateElementSelection() {
    const { _selectables: t, _options: n, _selection: o, _areaRect: i } = this, { stored: s, selected: r, touched: c } = o, { intersect: l, overlap: d } = n.behaviour, a = d === "invert", u = [], h = [], p = [];
    for (let v = 0; v < t.length; v++) {
      const m = t[v];
      if (Te(i, m.getBoundingClientRect(), l)) {
        if (r.includes(m))
          s.includes(m) && !c.includes(m) && c.push(m);
        else if (a && s.includes(m)) {
          p.push(m);
          continue;
        } else
          h.push(m);
        u.push(m);
      }
    }
    a && h.push(...s.filter((v) => !r.includes(v)));
    const g = d === "keep";
    for (let v = 0; v < r.length; v++) {
      const m = r[v];
      !u.includes(m) && !// Check if user wants to keep previously selected elements, e.g.
      // not make them part of the current selection as soon as they're touched.
      (g && s.includes(m)) && p.push(m);
    }
    o.selected = u, o.changed = { added: h, removed: p }, this._latestElement = void 0;
  }
  _emitEvent(t, n) {
    return this.emit(t, {
      event: n,
      store: this._selection,
      selection: this
    });
  }
  _keepSelection() {
    const { _options: t, _selection: n } = this, { selected: o, changed: i, touched: s, stored: r } = n, c = o.filter((l) => !r.includes(l));
    switch (t.behaviour.overlap) {
      case "drop": {
        n.stored = [
          ...c,
          ...r.filter((l) => !s.includes(l))
          // Elements not touched
        ];
        break;
      }
      case "invert": {
        n.stored = [
          ...c,
          ...r.filter((l) => !i.removed.includes(l))
          // Elements not removed from selection
        ];
        break;
      }
      case "keep": {
        n.stored = [
          ...r,
          ...o.filter((l) => !r.includes(l))
          // Newly added
        ];
        break;
      }
    }
  }
  /**
   * Manually triggers the start of a selection
   * @param evt A MouseEvent / TouchEvent -like object
   * @param silent If beforestart should be fired,
   */
  trigger(t, n = !0) {
    this._onTapStart(t, n);
  }
  /**
   * Can be used if during a selection elements have been added.
   * Will update everything which can be selected.
   */
  resolveSelectables() {
    this._selectables = W(this._options.selectables, this._options.document);
  }
  /**
   * Same as deselect, but for all elements currently selected.
   * @param includeStored If the store should also get cleared
   * @param quiet If move / stop events should be fired
   */
  clearSelection(t = !0, n = !1) {
    const { selected: o, stored: i, changed: s } = this._selection;
    s.added = [], s.removed.push(
      ...o,
      ...t ? i : []
    ), n || (this._emitEvent("move", null), this._emitEvent("stop", null)), this._selection = {
      stored: t ? [] : i,
      selected: [],
      touched: [],
      changed: { added: [], removed: [] }
    };
  }
  /**
   * @returns {Array} Selected elements
   */
  getSelection() {
    return this._selection.stored;
  }
  /**
   * @returns {HTMLElement} The selection area element
   */
  getSelectionArea() {
    return this._area;
  }
  /**
   * Cancel the current selection process.
   * @param keepEvent {boolean} true to fire a stop event after cancel.
   */
  cancel(t = !1) {
    this._onTapStop(null, !t);
  }
  /**
   * Unbinds all events and removes the area-element.
   */
  destroy() {
    this.cancel(), this.disable(), this._clippingElement.remove(), super.unbindAllListeners();
  }
  /**
   * Adds elements to the selection
   * @param query - CSS Query, can be an array of queries
   * @param quiet - If this should not trigger the move event
   */
  select(t, n = !1) {
    const { changed: o, selected: i, stored: s } = this._selection, r = W(t, this._options.document).filter(
      (c) => !i.includes(c) && !s.includes(c)
    );
    return s.push(...r), i.push(...r), o.added.push(...r), o.removed = [], this._latestElement = void 0, n || (this._emitEvent("move", null), this._emitEvent("stop", null)), r;
  }
  /**
   * Removes a particular element from the selection.
   * @param query - CSS Query, can be an array of queries
   * @param quiet - If this should not trigger the move event
   */
  deselect(t, n = !1) {
    const { selected: o, stored: i, changed: s } = this._selection, r = W(t, this._options.document).filter(
      (c) => o.includes(c) || i.includes(c)
    );
    r.length && (this._selection.stored = i.filter((c) => !r.includes(c)), this._selection.selected = o.filter((c) => !r.includes(c)), this._selection.changed.added = [], this._selection.changed.removed.push(
      ...r.filter((c) => !s.removed.includes(c))
    ), this._latestElement = void 0, n || (this._emitEvent("move", null), this._emitEvent("stop", null)));
  }
}
N(Ie, "version", "3.5.1");
function Pt(e) {
  const t = e.mouseSelectionButton === 2 ? [2] : [0], n = new Ie({
    selectables: [".map-container me-tpc"],
    boundaries: [e.container],
    container: e.selectionContainer,
    behaviour: {
      triggers: t,
      // Scroll configuration.
      scrolling: {
        // On scrollable areas the number on px per frame is devided by this amount.
        // Default is 10 to provide a enjoyable scroll experience.
        speedDivider: 10,
        // Browsers handle mouse-wheel events differently, this number will be used as
        // numerator to calculate the mount of px while scrolling manually: manualScrollSpeed / scrollSpeedDivider.
        manualSpeed: 750,
        // This property defines the virtual inset margins from the borders of the container
        // component that, when crossed by the mouse/touch, trigger the scrolling. Useful for
        // fullscreen containers.
        startScrollMargins: { x: 10, y: 10 }
      }
    }
  }).on("beforestart", ({ event: o }) => {
    if (o.target.tagName === "ME-TPC" || o.target.id === "input-box" || o.target.className === "circle")
      return !1;
    const i = n.getSelectionArea();
    return i.style.background = "#4f90f22d", i.style.border = "1px solid #4f90f2", i.parentElement && (i.parentElement.style.zIndex = "9999"), !0;
  }).on("start", ({ event: o }) => {
    !o.ctrlKey && !o.metaKey && (e.clearSelection(), n.clearSelection(!0, !0));
  }).on(
    "move",
    ({
      store: {
        changed: { added: o, removed: i }
      }
    }) => {
      k.moved = !0;
      for (const s of o)
        s.classList.add("selected");
      for (const s of i)
        s.classList.remove("selected");
    }
  ).on("stop", ({ store: { stored: o } }) => {
    e.selectNodes(o);
  });
  e.selection = n;
}
const Bt = function(e, t = !0) {
  this.theme = e;
  const n = this.theme.cssVar, o = Object.keys(n);
  this.container.style.cssText = "";
  for (let i = 0; i < o.length; i++) {
    const s = o[i];
    this.container.style.setProperty(s, n[s]);
  }
  e.cssVar["--gap"] || this.container.style.setProperty("--gap", "30px"), t && this.refresh();
}, Y = (e) => {
  var o;
  const t = (o = e.parent) == null ? void 0 : o.children, n = (t == null ? void 0 : t.indexOf(e)) ?? 0;
  return { siblings: t, index: n };
};
function Rt(e) {
  const { siblings: t, index: n } = Y(e);
  if (t === void 0)
    return;
  const o = t[n];
  n === 0 ? (t[n] = t[t.length - 1], t[t.length - 1] = o) : (t[n] = t[n - 1], t[n - 1] = o);
}
function zt(e) {
  const { siblings: t, index: n } = Y(e);
  if (t === void 0)
    return;
  const o = t[n];
  n === t.length - 1 ? (t[n] = t[0], t[0] = o) : (t[n] = t[n + 1], t[n + 1] = o);
}
function be(e) {
  const { siblings: t, index: n } = Y(e);
  return t === void 0 ? 0 : (t.splice(n, 1), t.length);
}
function Ft(e, t, n) {
  const { siblings: o, index: i } = Y(n);
  o !== void 0 && (t === "before" ? o.splice(i, 0, e) : o.splice(i + 1, 0, e));
}
function qt(e, t) {
  const { siblings: n, index: o } = Y(e);
  n !== void 0 && (n[o] = t, t.children = [e]);
}
function Ke(e, t, n) {
  var o;
  if (be(t), (o = n.parent) != null && o.parent || (t.direction = n.direction), e === "in")
    n.children ? n.children.push(t) : n.children = [t];
  else {
    t.direction !== void 0 && (t.direction = n.direction);
    const { siblings: i, index: s } = Y(n);
    if (i === void 0)
      return;
    e === "before" ? i.splice(s, 0, t) : i.splice(s + 1, 0, t);
  }
}
const Vt = function({ map: e, direction: t }, n) {
  var o, i;
  if (t === $)
    return $;
  if (t === P)
    return P;
  if (t === ae) {
    const s = ((o = e.querySelector(".lhs")) == null ? void 0 : o.childElementCount) || 0, r = ((i = e.querySelector(".rhs")) == null ? void 0 : i.childElementCount) || 0;
    return s <= r ? (n.direction = $, $) : (n.direction = P, P);
  }
}, Ue = function(e, t, n) {
  var s, r;
  const o = n.children[0].children[0], i = t.parentElement;
  if (i.tagName === "ME-PARENT") {
    if (Q(o), i.children[1])
      i.nextSibling.appendChild(n);
    else {
      const c = e.createChildren([n]);
      i.appendChild(ve(!0)), i.insertAdjacentElement("afterend", c);
    }
    e.linkDiv(n.offsetParent);
  } else
    i.tagName === "ME-ROOT" && (Vt(e, o.nodeObj) === $ ? (s = e.container.querySelector(".lhs")) == null || s.appendChild(n) : (r = e.container.querySelector(".rhs")) == null || r.appendChild(n), e.linkDiv());
}, Ye = function(e, t) {
  const n = e.parentNode;
  if (t === 0) {
    const o = n.parentNode.parentNode;
    o.tagName !== "ME-MAIN" && (o.previousSibling.children[1].remove(), o.remove());
  }
  n.parentNode.remove();
}, Xe = {
  before: "beforebegin",
  after: "afterend"
}, Q = function(e) {
  const n = e.parentElement.parentElement.lastElementChild;
  (n == null ? void 0 : n.tagName) === "svg" && (n == null || n.remove());
}, Wt = function(e, t) {
  const n = e.nodeObj, o = me(n);
  o.style && t.style && (t.style = Object.assign(o.style, t.style));
  const i = Object.assign(n, t);
  ge(e, i), this.linkDiv(), this.bus.fire("operation", {
    name: "reshapeNode",
    obj: i,
    origin: o
  });
}, ye = function(e, t, n) {
  if (!t)
    return null;
  const o = t.nodeObj;
  o.expanded === !1 && (e.expandNode(t, !0), t = S(o.id));
  const i = n || e.generateNewObj();
  o.children ? o.children.push(i) : o.children = [i], B(e.nodeData);
  const { grp: s, top: r } = e.createWrapper(i);
  return Ue(e, t, s), { newTop: r, newNodeObj: i };
}, It = function(e, t, n) {
  var d, a, u, h;
  const o = t || this.currentNode;
  if (!o)
    return;
  const i = o.nodeObj;
  if (i.parent) {
    if (!((d = i.parent) != null && d.parent) && ((u = (a = i.parent) == null ? void 0 : a.children) == null ? void 0 : u.length) === 1) {
      this.addChild(S(i.parent.id), n);
      return;
    }
  } else {
    this.addChild();
    return;
  }
  const s = n || this.generateNewObj();
  if (!((h = i.parent) != null && h.parent)) {
    const p = o.closest("me-main").className === L.LHS ? $ : P;
    s.direction = p;
  }
  Ft(s, e, i), B(this.nodeData);
  const r = o.parentElement, { grp: c, top: l } = this.createWrapper(s);
  r.parentElement.insertAdjacentElement(Xe[e], c), this.linkDiv(c.offsetParent), n || this.editTopic(l.firstChild), this.selectNode(l.firstChild, !0), this.bus.fire("operation", {
    name: "insertSibling",
    type: e,
    obj: s
  });
}, Kt = function(e, t) {
  const n = e || this.currentNode;
  if (!n)
    return;
  Q(n);
  const o = n.nodeObj;
  if (!o.parent)
    return;
  const i = t || this.generateNewObj();
  qt(o, i), B(this.nodeData);
  const s = n.parentElement.parentElement, { grp: r, top: c } = this.createWrapper(i, !0);
  c.appendChild(ve(!0)), s.insertAdjacentElement("afterend", r);
  const l = this.createChildren([s]);
  c.insertAdjacentElement("afterend", l), this.linkDiv(), t || this.editTopic(c.firstChild), this.selectNode(c.firstChild, !0), this.bus.fire("operation", {
    name: "insertParent",
    obj: i
  });
}, Ut = function(e, t) {
  const n = e || this.currentNode;
  if (!n)
    return;
  const o = ye(this, n, t);
  if (!o)
    return;
  const { newTop: i, newNodeObj: s } = o;
  this.bus.fire("operation", {
    name: "addChild",
    obj: s
  }), t || this.editTopic(i.firstChild), this.selectNode(i.firstChild, !0);
}, Yt = function(e, t) {
  const n = me(e.nodeObj);
  pe(n);
  const o = ye(this, t, n);
  if (!o)
    return;
  const { newNodeObj: i } = o;
  this.selectNode(S(i.id)), this.bus.fire("operation", {
    name: "copyNode",
    obj: i
  });
}, Xt = function(e, t) {
  e = de(e);
  const n = [];
  for (let o = 0; o < e.length; o++) {
    const i = e[o], s = me(i.nodeObj);
    pe(s);
    const r = ye(this, t, s);
    if (!r)
      return;
    const { newNodeObj: c } = r;
    n.push(c);
  }
  this.selectNodes(n.map((o) => S(o.id))), this.bus.fire("operation", {
    name: "copyNodes",
    objs: n
  });
}, Gt = function(e) {
  const t = e || this.currentNode;
  if (!t)
    return;
  const n = t.nodeObj;
  Rt(n);
  const o = t.parentNode.parentNode;
  o.parentNode.insertBefore(o, o.previousSibling), this.linkDiv(), this.bus.fire("operation", {
    name: "moveUpNode",
    obj: n
  });
}, Jt = function(e) {
  const t = e || this.currentNode;
  if (!t)
    return;
  const n = t.nodeObj;
  zt(n);
  const o = t.parentNode.parentNode;
  o.nextSibling ? o.nextSibling.insertAdjacentElement("afterend", o) : o.parentNode.prepend(o), this.linkDiv(), this.bus.fire("operation", {
    name: "moveDownNode",
    obj: n
  });
}, Zt = function(e) {
  var r;
  const t = e || this.currentNode;
  if (!t)
    return;
  const n = t.nodeObj;
  if (!n.parent)
    throw new Error("Can not remove root node");
  const o = n.parent.children, i = o.findIndex((c) => c === n), s = be(n);
  if (Ye(t, s), o.length !== 0) {
    const c = o[i] || o[i - 1];
    this.selectNode(S(c.id));
  } else
    this.selectNode(S(n.parent.id));
  this.linkDiv(), this.bus.fire("operation", {
    name: "removeNode",
    obj: n,
    originIndex: i,
    originParentId: (r = n == null ? void 0 : n.parent) == null ? void 0 : r.id
  });
}, Qt = function(e) {
  e = de(e);
  for (const t of e) {
    const n = t.nodeObj;
    if (!n.parent)
      continue;
    const o = be(n);
    Ye(t, o);
  }
  this.linkDiv(), this.bus.fire("operation", {
    name: "removeNodes",
    objs: e.map((t) => t.nodeObj)
  });
}, en = function(e, t) {
  e = de(e);
  const n = t.nodeObj;
  n.expanded === !1 && (this.expandNode(t, !0), t = S(n.id));
  for (const o of e) {
    const i = o.nodeObj;
    Ke("in", i, n), B(this.nodeData);
    const s = o.parentElement;
    Ue(this, t, s.parentElement);
  }
  this.linkDiv(), this.bus.fire("operation", {
    name: "moveNodeIn",
    objs: e.map((o) => o.nodeObj),
    toObj: n
  });
}, Ge = (e, t, n, o) => {
  e = de(e), t === "after" && (e = e.reverse());
  const i = n.nodeObj, s = [];
  for (const r of e) {
    const c = r.nodeObj;
    Ke(t, c, i), B(o.nodeData), Q(r);
    const l = r.parentElement.parentNode;
    s.includes(l.parentElement) || s.push(l.parentElement), n.parentElement.parentNode.insertAdjacentElement(Xe[t], l);
  }
  for (const r of s)
    r.childElementCount === 0 && r.tagName !== "ME-MAIN" && (r.previousSibling.children[1].remove(), r.remove());
  o.linkDiv(), o.bus.fire("operation", {
    name: t === "before" ? "moveNodeBefore" : "moveNodeAfter",
    objs: e.map((r) => r.nodeObj),
    toObj: i
  });
}, tn = function(e, t) {
  Ge(e, "before", t, this);
}, nn = function(e, t) {
  Ge(e, "after", t, this);
}, on = function(e) {
  const t = e || this.currentNode;
  t && (t.nodeObj.dangerouslySetInnerHTML || this.editTopic(t));
}, sn = function(e, t) {
  e.text.textContent = t, e.nodeObj.topic = t, this.linkDiv();
}, Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addChild: Ut,
  beginEdit: on,
  copyNode: Yt,
  copyNodes: Xt,
  insertParent: Kt,
  insertSibling: It,
  moveDownNode: Jt,
  moveNodeAfter: nn,
  moveNodeBefore: tn,
  moveNodeIn: en,
  moveUpNode: Gt,
  removeNode: Zt,
  removeNodes: Qt,
  reshapeNode: Wt,
  rmSubline: Q,
  setNodeTopic: sn
}, Symbol.toStringTag, { value: "Module" }));
function Ze(e) {
  return {
    nodeData: e.isFocusMode ? e.nodeDataBackup : e.nodeData,
    arrows: e.arrows,
    summaries: e.summaries,
    direction: e.direction,
    theme: e.theme
  };
}
const rn = function(e, t, n) {
  if (e) {
    if (this.clearSelection(), typeof e == "string") {
      const o = S(e);
      return o ? this.selectNode(o) : void 0;
    }
    e.className = "selected", e.scrollIntoView({ block: "nearest", inline: "nearest" }), this.currentNode = e, t ? this.bus.fire("selectNewNode", e.nodeObj) : this.bus.fire("selectNode", e.nodeObj, n);
  }
}, cn = function() {
  this.currentNode && (this.currentNode.className = ""), this.currentNode = null, this.bus.fire("unselectNode");
}, ln = function(e) {
  this.clearSelection();
  for (const t of e)
    t.className = "selected";
  this.currentNodes = e, this.bus.fire(
    "selectNodes",
    e.map((t) => t.nodeObj)
  );
}, an = function() {
  if (this.currentNodes)
    for (const e of this.currentNodes)
      e.classList.remove("selected");
  this.currentNodes = null, this.bus.fire("unselectNodes");
}, dn = function() {
  this.unselectNode(), this.unselectNodes(), this.unselectSummary(), this.unselectArrow();
}, hn = function() {
  const e = Ze(this);
  return JSON.stringify(e, (t, n) => {
    if (!(t === "parent" && typeof n != "string"))
      return n;
  });
}, un = function() {
  return JSON.parse(this.getDataString());
}, fn = function() {
  const e = Ze(this).nodeData;
  let t = "# " + e.topic + `

`;
  function n(o, i) {
    for (let s = 0; s < o.length; s++)
      i <= 6 ? t += "".padStart(i, "#") + " " + o[s].topic + `

` : t += "".padStart(i - 7, "	") + "- " + o[s].topic + `
`, o[s].children && n(o[s].children || [], i + 1);
  }
  return n(e.children || [], 2), t;
}, pn = function() {
  this.editable = !0;
}, mn = function() {
  this.editable = !1;
}, gn = function(e) {
  this.scaleVal = e, this.map.style.transform = "scale(" + e + ")", this.bus.fire("scale", e);
}, vn = function() {
  const e = this.nodes.offsetHeight / this.container.offsetHeight, t = this.nodes.offsetWidth / this.container.offsetWidth, n = 1 / Math.max(1, Math.max(e, t));
  this.scaleVal = n, this.map.style.transform = "scale(" + n + ")", this.bus.fire("scale", n);
}, bn = function() {
  this.container.scrollTo(1e4 - this.container.offsetWidth / 2, 1e4 - this.container.offsetHeight / 2);
}, yn = function(e) {
  e(this);
}, xn = function(e) {
  e.nodeObj.parent && (this.tempDirection === null && (this.tempDirection = this.direction), this.isFocusMode || (this.nodeDataBackup = this.nodeData, this.isFocusMode = !0), this.nodeData = e.nodeObj, this.initRight(), this.toCenter());
}, wn = function() {
  this.isFocusMode = !1, this.tempDirection !== null && (this.nodeData = this.nodeDataBackup, this.direction = this.tempDirection, this.tempDirection = null, this.refresh(), this.toCenter());
}, En = function() {
  this.direction = 0, this.refresh();
}, Nn = function() {
  this.direction = 1, this.refresh();
}, Cn = function() {
  this.direction = 2, this.refresh();
}, Sn = function(e) {
  this.locale = e, this.refresh();
}, _n = function(e, t) {
  const n = e.nodeObj;
  typeof t == "boolean" ? n.expanded = t : n.expanded !== !1 ? n.expanded = !1 : n.expanded = !0;
  const o = e.parentNode, i = o.children[1];
  if (i.expanded = n.expanded, i.className = n.expanded ? "minus" : "", Q(e), n.expanded) {
    const l = this.createChildren(
      n.children.map((d) => this.createWrapper(d).grp)
    );
    o.parentNode.appendChild(l);
  } else
    o.parentNode.children[1].remove();
  this.linkDiv(e.closest("me-main > me-wrapper"));
  const s = e.getBoundingClientRect(), r = this.container.getBoundingClientRect();
  (s.bottom > r.bottom || s.top < r.top || s.right > r.right || s.left < r.left) && e.scrollIntoView({ block: "center", inline: "center" }), this.bus.fire("expandNode", n);
}, Ln = function(e) {
  e && (e = JSON.parse(JSON.stringify(e)), this.nodeData = e.nodeData, this.arrows = e.arrows || [], this.summaries = e.summaries || []), B(this.nodeData), this.layout(), this.linkDiv();
}, Mn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelFocus: wn,
  clearSelection: dn,
  disableEdit: mn,
  enableEdit: pn,
  expandNode: _n,
  focusNode: xn,
  getData: un,
  getDataMd: fn,
  getDataString: hn,
  initLeft: En,
  initRight: Nn,
  initSide: Cn,
  install: yn,
  refresh: Ln,
  scale: gn,
  scaleFit: vn,
  selectNode: rn,
  selectNodes: ln,
  setLocale: Sn,
  toCenter: bn,
  unselectNode: cn,
  unselectNodes: an
}, Symbol.toStringTag, { value: "Module" })), kn = function(e) {
  return {
    dom: e,
    moved: !1,
    // diffrentiate click and move
    mousedown: !1,
    handleMouseMove(t) {
      this.mousedown && (this.moved = !0, this.cb && this.cb(t.movementX, t.movementY));
    },
    handleMouseDown(t) {
      t.button === 0 && (this.mousedown = !0);
    },
    handleClear(t) {
      this.mousedown = !1;
    },
    cb: null,
    init(t, n) {
      this.cb = n, this.handleClear = this.handleClear.bind(this), this.handleMouseMove = this.handleMouseMove.bind(this), this.handleMouseDown = this.handleMouseDown.bind(this), t.addEventListener("mousemove", this.handleMouseMove), t.addEventListener("mouseleave", this.handleClear), t.addEventListener("mouseup", this.handleClear), this.dom.addEventListener("mousedown", this.handleMouseDown);
    },
    destory(t) {
      t.removeEventListener("mousemove", this.handleMouseMove), t.removeEventListener("mouseleave", this.handleClear), t.removeEventListener("mouseup", this.handleClear), this.dom.removeEventListener("mousedown", this.handleMouseDown);
    },
    clear() {
      this.moved = !1, this.mousedown = !1;
    }
  };
}, De = {
  create: kn
};
function le(e, t, n) {
  const { offsetLeft: o, offsetTop: i } = R(e.nodes, t), s = t.offsetWidth, r = t.offsetHeight, c = o + s / 2, l = i + r / 2, d = c + n.x, a = l + n.y;
  return {
    w: s,
    h: r,
    cx: c,
    cy: l,
    ctrlX: d,
    ctrlY: a
  };
}
function I(e) {
  let t, n;
  const o = (e.cy - e.ctrlY) / (e.ctrlX - e.cx);
  return o > e.h / e.w || o < -e.h / e.w ? e.cy - e.ctrlY < 0 ? (t = e.cx - e.h / 2 / o, n = e.cy + e.h / 2) : (t = e.cx + e.h / 2 / o, n = e.cy - e.h / 2) : e.cx - e.ctrlX < 0 ? (t = e.cx + e.w / 2, n = e.cy - e.w * o / 2) : (t = e.cx - e.w / 2, n = e.cy + e.w * o / 2), {
    x: t,
    y: n
  };
}
const Tn = function(e, t, n, o) {
  const i = document.createElementNS("http://www.w3.org/2000/svg", "text");
  return C(i, {
    "text-anchor": "middle",
    x: t + "",
    y: n + "",
    fill: o || "#666"
  }), i.dataset.type = "custom-link", i.innerHTML = e, i;
}, Qe = function(e, t, n, o, i) {
  if (!t || !n)
    return;
  performance.now();
  const s = le(e, t, o.delta1), r = le(e, n, o.delta2), { x: c, y: l } = I(s), { ctrlX: d, ctrlY: a } = s, { ctrlX: u, ctrlY: h } = r, { x: p, y: g } = I(r), v = re(u, h, p, g), m = `M ${v.x1} ${v.y1} L ${p} ${g} L ${v.x2} ${v.y2}`;
  let f = "";
  if (o.bidirectional) {
    const w = re(d, a, c, l);
    f = `M ${w.x1} ${w.y1} L ${c} ${l} L ${w.x2} ${w.y2}`;
  }
  const b = ft(`M ${c} ${l} C ${d} ${a} ${u} ${h} ${p} ${g}`, m, f), x = c / 8 + d * 3 / 8 + u * 3 / 8 + p / 8, E = l / 8 + a * 3 / 8 + h * 3 / 8 + g / 8, y = Tn(o.label, x, E, e.theme.cssVar["--color"]);
  b.appendChild(y), b.arrowObj = o, b.dataset.linkid = o.id, e.linkSvgGroup.appendChild(b), i || (e.arrows.push(o), e.currentArrow = b, et(e, o, s, r)), performance.now();
}, An = function(e, t, n = {}) {
  const o = {
    id: U(),
    label: "Custom Link",
    from: e.nodeObj.id,
    to: t.nodeObj.id,
    delta1: {
      x: 0,
      y: -200
    },
    delta2: {
      x: 0,
      y: -200
    },
    ...n
  };
  Qe(this, e, t, o), this.bus.fire("operation", {
    name: "createArrow",
    obj: o
  });
}, $n = function(e) {
  let t;
  if (e ? t = e : t = this.currentArrow, !t)
    return;
  xe(this);
  const n = t.arrowObj.id;
  this.arrows = this.arrows.filter((o) => o.id !== n), t.remove(), this.bus.fire("operation", {
    name: "removeArrow",
    obj: {
      id: n
    }
  });
}, jn = function(e) {
  this.currentArrow = e;
  const t = e.arrowObj, n = S(t.from), o = S(t.to), i = le(this, n, t.delta1), s = le(this, o, t.delta2);
  et(this, t, i, s);
}, Dn = function() {
  this.currentArrow = null, xe(this);
}, xe = function(e) {
  var t, n;
  (t = e.helper1) == null || t.destory(e.map), (n = e.helper2) == null || n.destory(e.map), e.linkController.style.display = "none", e.P2.style.display = "none", e.P3.style.display = "none";
}, et = function(e, t, n, o) {
  e.linkController.style.display = "initial", e.P2.style.display = "initial", e.P3.style.display = "initial", e.nodes.appendChild(e.linkController), e.nodes.appendChild(e.P2), e.nodes.appendChild(e.P3);
  let { x: i, y: s } = I(n), { ctrlX: r, ctrlY: c } = n, { ctrlX: l, ctrlY: d } = o, { x: a, y: u } = I(o);
  e.P2.style.cssText = `top:${c}px;left:${r}px;`, e.P3.style.cssText = `top:${d}px;left:${l}px;`, C(e.line1, {
    x1: i + "",
    y1: s + "",
    x2: r + "",
    y2: c + ""
  }), C(e.line2, {
    x1: l + "",
    y1: d + "",
    x2: a + "",
    y2: u + ""
  }), e.helper1 = De.create(e.P2), e.helper2 = De.create(e.P3), e.helper1.init(e.map, (h, p) => {
    if (!e.currentArrow)
      return;
    r = r + h / e.scaleVal, c = c + p / e.scaleVal;
    const g = I({ ...n, ctrlX: r, ctrlY: c });
    i = g.x, s = g.y;
    const v = i / 8 + r * 3 / 8 + l * 3 / 8 + a / 8, m = s / 8 + c * 3 / 8 + d * 3 / 8 + u / 8;
    if (e.P2.style.top = c + "px", e.P2.style.left = r + "px", e.currentArrow.children[0].setAttribute("d", `M ${i} ${s} C ${r} ${c} ${l} ${d} ${a} ${u}`), t.bidirectional) {
      const f = re(r, c, i, s);
      e.currentArrow.children[2].setAttribute("d", `M ${f.x1} ${f.y1} L ${i} ${s} L ${f.x2} ${f.y2}`);
    }
    C(e.currentArrow.children[3], {
      x: v + "",
      y: m + ""
    }), C(e.line1, {
      x1: i + "",
      y1: s + "",
      x2: r + "",
      y2: c + ""
    }), t.delta1.x = r - n.cx, t.delta1.y = c - n.cy, e.bus.fire("updateArrowDelta", t);
  }), e.helper2.init(e.map, (h, p) => {
    if (!e.currentArrow)
      return;
    l = l + h / e.scaleVal, d = d + p / e.scaleVal;
    const g = I({ ...o, ctrlX: l, ctrlY: d });
    a = g.x, u = g.y;
    const v = i / 8 + r * 3 / 8 + l * 3 / 8 + a / 8, m = s / 8 + c * 3 / 8 + d * 3 / 8 + u / 8, f = re(l, d, a, u);
    e.P3.style.top = d + "px", e.P3.style.left = l + "px", e.currentArrow.children[0].setAttribute("d", `M ${i} ${s} C ${r} ${c} ${l} ${d} ${a} ${u}`), e.currentArrow.children[1].setAttribute("d", `M ${f.x1} ${f.y1} L ${a} ${u} L ${f.x2} ${f.y2}`), C(e.currentArrow.children[3], {
      x: v + "",
      y: m + ""
    }), C(e.line2, {
      x1: l + "",
      y1: d + "",
      x2: a + "",
      y2: u + ""
    }), t.delta2.x = l - o.cx, t.delta2.y = d - o.cy, e.bus.fire("updateArrowDelta", t);
  });
};
function On() {
  this.linkSvgGroup.innerHTML = "";
  for (let e = 0; e < this.arrows.length; e++) {
    const t = this.arrows[e];
    try {
      Qe(this, S(t.from), S(t.to), t, !0);
    } catch {
    }
  }
  this.nodes.appendChild(this.linkSvgGroup);
}
function Hn(e) {
  if (xe(this), !e)
    return;
  const t = e.children[3];
  qe(this, t, (n) => {
    var s;
    const o = e.arrowObj, i = ((s = n.textContent) == null ? void 0 : s.trim()) || "";
    i === "" ? o.label = origin : o.label = i, n.remove(), i !== origin && (t.innerHTML = o.label, this.linkDiv(), this.bus.fire("operation", {
      name: "finishEditArrowLabel",
      obj: o
    }));
  });
}
function Pn() {
  this.arrows = this.arrows.filter((e) => se(e.from, this.nodeData) && se(e.to, this.nodeData));
}
const Bn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createArrow: An,
  editArrowLabel: Hn,
  removeArrow: $n,
  renderArrow: On,
  selectArrow: jn,
  tidyArrow: Pn,
  unselectArrow: Dn
}, Symbol.toStringTag, { value: "Module" })), Rn = function(e) {
  var l, d;
  if (e.length === 0)
    throw new Error("No selected node.");
  if (e.length === 1) {
    const a = e[0].nodeObj, u = e[0].nodeObj.parent;
    if (!u)
      throw new Error("Can not select root node.");
    const h = u.children.findIndex((p) => a === p);
    return {
      parent: u.id,
      start: h,
      end: h
    };
  }
  let t = 0;
  const n = e.map((a) => {
    let u = a.nodeObj;
    const h = [];
    for (; u.parent; ) {
      const p = u.parent, g = p.children, v = g == null ? void 0 : g.indexOf(u);
      u = p, h.unshift({ node: u, index: v });
    }
    return h.length > t && (t = h.length), h;
  });
  let o = 0;
  e:
    for (; o < t; o++) {
      const a = (l = n[0][o]) == null ? void 0 : l.node;
      for (let u = 1; u < n.length; u++)
        if (((d = n[u][o]) == null ? void 0 : d.node) !== a)
          break e;
    }
  if (!o)
    throw new Error("Can not select root node.");
  const i = n.map((a) => a[o - 1].index).sort(), s = i[0] || 0, r = i[i.length - 1] || 0, c = n[0][o - 1].node;
  if (!c.parent)
    throw new Error("Please select nodes in the same main topic.");
  return {
    parent: c.id,
    start: s,
    end: r
  };
}, zn = function(e) {
  const t = document.createElementNS("http://www.w3.org/2000/svg", "g");
  return t.setAttribute("id", e), t;
}, Oe = function(e, t) {
  const n = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return C(n, {
    d: e,
    stroke: t || "#666",
    fill: "none",
    "stroke-linecap": "round",
    "stroke-width": "2"
  }), n;
}, He = function(e, t, n, o, i) {
  const s = document.createElementNS("http://www.w3.org/2000/svg", "text");
  return C(s, {
    "text-anchor": o,
    x: t + "",
    y: n + "",
    fill: i || "#666"
  }), s.innerHTML = e, s;
}, Fn = (e) => S(e).parentElement.parentElement, qn = function({ parent: e, start: t }) {
  const n = S(e), o = n.nodeObj;
  let i;
  return o.parent ? i = n.closest("me-main").className : i = S(o.children[t].id).closest("me-main").className, i;
}, we = function(e, t) {
  var w;
  const { id: n, text: o, parent: i, start: s, end: r } = t, c = e.nodes, d = S(i).nodeObj, a = qn(t);
  let u = 1 / 0, h = 0, p = 0, g = 0;
  for (let _ = s; _ <= r; _++) {
    const M = (w = d.children) == null ? void 0 : w[_];
    if (!M)
      return e.removeSummary(n), null;
    const j = Fn(M.id), { offsetLeft: z, offsetTop: X } = R(c, j), Ee = s === r ? 10 : 20;
    _ === s && (p = X + Ee), _ === r && (g = X + j.offsetHeight - Ee), z < u && (u = z), j.offsetWidth + z > h && (h = j.offsetWidth + z);
  }
  let v, m;
  const f = p + 10, b = g + 10, x = (f + b) / 2, E = e.theme.cssVar["--color"];
  a === L.LHS ? (v = Oe(`M ${u + 10} ${f} c -5 0 -10 5 -10 10 L ${u} ${b - 10} c 0 5 5 10 10 10 M ${u} ${x} h -10`, E), m = He(o, u - 20, x + 6, "end", E)) : (v = Oe(`M ${h - 10} ${f} c 5 0 10 5 10 10 L ${h} ${b - 10} c 0 5 -5 10 -10 10 M ${h} ${x} h 10`, E), m = He(o, h + 20, x + 6, "start", E));
  const y = zn("s-" + n);
  return y.appendChild(v), y.appendChild(m), y.summaryObj = t, e.summarySvg.appendChild(y), y;
}, Vn = function() {
  let e = [];
  this.currentNode ? e = [this.currentNode] : this.currentNodes && (e = this.currentNodes);
  const { parent: t, start: n, end: o } = Rn(e), i = { id: U(), parent: t, start: n, end: o, text: "summary" }, s = we(this, i);
  this.summaries.push(i), this.editSummary(s), this.bus.fire("operation", {
    name: "createSummary",
    obj: i
  });
}, Wn = function(e) {
  const t = U(), n = { ...e, id: t };
  we(this, n), this.summaries.push(n), this.bus.fire("operation", {
    name: "createSummary",
    obj: n
  });
}, In = function(e) {
  var n;
  const t = this.summaries.findIndex((o) => o.id === e);
  t > -1 && (this.summaries.splice(t, 1), (n = document.querySelector("#s-" + e)) == null || n.remove()), this.bus.fire("operation", {
    name: "removeSummary",
    obj: { id: e }
  });
}, Kn = function(e) {
  const t = e.children[1].getBBox(), n = 6, o = 3, i = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  C(i, {
    x: t.x - n + "",
    y: t.y - n + "",
    width: t.width + n * 2 + "",
    height: t.height + n * 2 + "",
    rx: o + "",
    stroke: this.theme.cssVar["--selected"] || "#4dc4ff",
    "stroke-width": "2",
    fill: "none"
  }), e.appendChild(i), this.currentSummary = e;
}, Un = function() {
  var e, t;
  (t = (e = this.currentSummary) == null ? void 0 : e.querySelector("rect")) == null || t.remove(), this.currentSummary = null;
}, Yn = function() {
  this.summarySvg.innerHTML = "", this.summaries.forEach((e) => {
    try {
      we(this, e);
    } catch {
    }
  }), this.nodes.insertAdjacentElement("beforeend", this.summarySvg);
}, Xn = function(e) {
  if (!e)
    return;
  const t = e.childNodes[1];
  qe(this, t, (n) => {
    var s;
    const o = e.summaryObj, i = ((s = n.textContent) == null ? void 0 : s.trim()) || "";
    i === "" ? o.text = origin : o.text = i, n.remove(), i !== origin && (t.innerHTML = o.text, this.linkDiv(), this.bus.fire("operation", {
      name: "finishEditSummary",
      obj: o
    }));
  });
}, Gn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createSummary: Vn,
  createSummaryFrom: Wn,
  editSummary: Xn,
  removeSummary: In,
  renderSummary: Yn,
  selectSummary: Kn,
  unselectSummary: Un
}, Symbol.toStringTag, { value: "Module" })), A = "http://www.w3.org/2000/svg";
function Jn(e, t) {
  const n = document.createElementNS(A, "svg");
  return C(n, {
    version: "1.1",
    xmlns: A,
    height: e,
    width: t
  }), n;
}
function Zn(e, t) {
  return (parseInt(e) - parseInt(t)) / 2;
}
function Qn(e, t, n, o) {
  const i = document.createElementNS(A, "g");
  let s = "";
  return e.text ? s = e.text.textContent : s = e.childNodes[0].textContent, s.split(`
`).forEach((c, l) => {
    const d = document.createElementNS(A, "text");
    C(d, {
      x: n + parseInt(t.paddingLeft) + "",
      y: o + parseInt(t.paddingTop) + Zn(t.lineHeight, t.fontSize) * (l + 1) + parseFloat(t.fontSize) * (l + 1) + "",
      "text-anchor": "start",
      "font-family": t.fontFamily,
      "font-size": `${t.fontSize}`,
      "font-weight": `${t.fontWeight}`,
      fill: `${t.color}`
    }), d.innerHTML = c, i.appendChild(d);
  }), i;
}
function eo(e, t, n, o) {
  var c;
  let i = "";
  (c = e.nodeObj) != null && c.dangerouslySetInnerHTML ? i = e.nodeObj.dangerouslySetInnerHTML : e.text ? i = e.text.textContent : i = e.childNodes[0].textContent;
  const s = document.createElementNS(A, "foreignObject");
  C(s, {
    x: n + parseInt(t.paddingLeft) + "",
    y: o + parseInt(t.paddingTop) + "",
    width: t.width,
    height: t.height
  });
  const r = document.createElement("div");
  return C(r, {
    xmlns: "http://www.w3.org/1999/xhtml",
    style: `font-family: ${t.fontFamily}; font-size: ${t.fontSize}; font-weight: ${t.fontWeight}; color: ${t.color}; white-space: pre-wrap;`
  }), r.innerHTML = i, s.appendChild(r), s;
}
function to(e, t) {
  const n = getComputedStyle(t), { offsetLeft: o, offsetTop: i } = R(e.nodes, t), s = document.createElementNS(A, "rect");
  return C(s, {
    x: o + "",
    y: i + "",
    rx: n.borderRadius,
    ry: n.borderRadius,
    width: n.width,
    height: n.height,
    fill: n.backgroundColor,
    stroke: n.borderColor,
    "stroke-width": n.borderWidth
  }), s;
}
function ne(e, t, n = !1) {
  const o = getComputedStyle(t), { offsetLeft: i, offsetTop: s } = R(e.nodes, t), r = document.createElementNS(A, "rect");
  C(r, {
    x: i + "",
    y: s + "",
    rx: o.borderRadius,
    ry: o.borderRadius,
    width: o.width,
    height: o.height,
    fill: o.backgroundColor,
    stroke: o.borderColor,
    "stroke-width": o.borderWidth
  });
  const c = document.createElementNS(A, "g");
  c.appendChild(r);
  let l;
  return n ? l = eo(t, o, i, s) : l = Qn(t, o, i, s), c.appendChild(l), c;
}
function no(e, t) {
  const n = getComputedStyle(t), { offsetLeft: o, offsetTop: i } = R(e.nodes, t), s = document.createElementNS(A, "a"), r = document.createElementNS(A, "text");
  return C(r, {
    x: o + "",
    y: i + parseInt(n.fontSize) + "",
    "text-anchor": "start",
    "font-family": n.fontFamily,
    "font-size": `${n.fontSize}`,
    "font-weight": `${n.fontWeight}`,
    fill: `${n.color}`
  }), r.innerHTML = t.textContent, s.appendChild(r), s.setAttribute("href", t.href), s;
}
function oo(e, t) {
  const n = getComputedStyle(t), { offsetLeft: o, offsetTop: i } = R(e.nodes, t), s = document.createElementNS(A, "image");
  return C(s, {
    x: o + "",
    y: i + "",
    width: n.width + "",
    height: n.height + "",
    href: t.src
  }), s;
}
const oe = 100, io = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">', so = (e, t = !1) => {
  var u, h, p;
  const n = e.nodes, o = n.offsetHeight + oe * 2, i = n.offsetWidth + oe * 2, s = Jn(o + "px", i + "px"), r = document.createElementNS(A, "svg"), c = document.createElementNS(A, "rect");
  C(c, {
    x: "0",
    y: "0",
    width: `${i}`,
    height: `${o}`,
    fill: e.theme.cssVar["--bgcolor"]
  }), s.appendChild(c), n.querySelectorAll(".subLines").forEach((g) => {
    const v = g.cloneNode(!0), { offsetLeft: m, offsetTop: f } = R(n, g.parentElement);
    v.setAttribute("x", `${m}`), v.setAttribute("y", `${f}`), r.appendChild(v);
  });
  const l = (u = n.querySelector(".lines")) == null ? void 0 : u.cloneNode(!0);
  l && r.appendChild(l);
  const d = (h = n.querySelector(".topiclinks")) == null ? void 0 : h.cloneNode(!0);
  d && r.appendChild(d);
  const a = (p = n.querySelector(".summary")) == null ? void 0 : p.cloneNode(!0);
  return a && r.appendChild(a), n.querySelectorAll("me-tpc").forEach((g) => {
    g.nodeObj.dangerouslySetInnerHTML ? r.appendChild(ne(e, g, !t)) : (r.appendChild(to(e, g)), r.appendChild(ne(e, g.text, !t)));
  }), n.querySelectorAll(".tags > span").forEach((g) => {
    r.appendChild(ne(e, g));
  }), n.querySelectorAll(".icons > span").forEach((g) => {
    r.appendChild(ne(e, g));
  }), n.querySelectorAll(".hyper-link").forEach((g) => {
    r.appendChild(no(e, g));
  }), n.querySelectorAll("img").forEach((g) => {
    r.appendChild(oo(e, g));
  }), C(r, {
    x: oe + "",
    y: oe + "",
    overflow: "visible"
  }), s.appendChild(r), s;
}, ro = (e, t) => (t && e.insertAdjacentHTML("afterbegin", "<style>" + t + "</style>"), io + e.outerHTML);
function co(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onload = (i) => {
      t(i.target.result);
    }, o.onerror = (i) => {
      n(i);
    }, o.readAsDataURL(e);
  });
}
const lo = function(e = !1, t) {
  const n = so(this, e), o = ro(n, t);
  return new Blob([o], { type: "image/svg+xml" });
}, ao = async function(e = !1, t) {
  const n = this.exportSvg(e, t), o = await co(n);
  return new Promise((i, s) => {
    const r = new Image();
    r.setAttribute("crossOrigin", "anonymous"), r.onload = () => {
      const c = document.createElement("canvas");
      c.width = r.width, c.height = r.height, c.getContext("2d").drawImage(r, 0, 0), c.toBlob(i, "image/png", 1);
    }, r.src = o, r.onerror = s;
  });
}, ho = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exportPng: ao,
  exportSvg: lo
}, Symbol.toStringTag, { value: "Module" }));
function uo(e, t) {
  return async function(...n) {
    const o = this.before[t];
    o && !await o.apply(this, n) || e.apply(this, n);
  };
}
const Pe = Object.keys(Je), tt = {};
for (let e = 0; e < Pe.length; e++) {
  const t = Pe[e];
  tt[t] = uo(Je[t], t);
}
const fo = {
  getObjById: se,
  generateNewObj: nt,
  layout: st,
  linkDiv: pt,
  editTopic: ut,
  createWrapper: lt,
  createParent: at,
  createChildren: dt,
  createTopic: ht,
  findEle: S,
  changeTheme: Bt,
  ...Mn,
  ...tt,
  ...Bn,
  ...Gn,
  ...ho,
  init(e) {
    if (e = JSON.parse(JSON.stringify(e)), !e || !e.nodeData)
      return new Error("MindElixir: `data` is required");
    e.direction !== void 0 && (this.direction = e.direction), this.changeTheme(e.theme || this.theme, !1), this.nodeData = e.nodeData, B(this.nodeData), this.arrows = e.arrows || [], this.summaries = e.summaries || [], this.tidyArrow(), this.toolBar && kt(this), this.keypress && wt(this), this.editable && Pt(this), this.contextMenu && this.disposable.push(mt(this, this.contextMenuOption)), this.draggable && Ct(this), this.allowUndo && _t(this), this.toCenter(), this.layout(), this.linkDiv();
  },
  destroy() {
    var e;
    this.disposable.forEach((t) => t()), this.mindElixirBox && (this.mindElixirBox.innerHTML = ""), this.mindElixirBox = void 0, this.nodeData = void 0, this.arrows = void 0, this.summaries = void 0, this.currentArrow = void 0, this.currentNode = void 0, this.currentNodes = void 0, this.currentSummary = void 0, this.waitCopy = void 0, this.theme = void 0, this.direction = void 0, this.bus = void 0, this.container = void 0, this.map = void 0, this.lines = void 0, this.linkController = void 0, this.linkSvgGroup = void 0, this.P2 = void 0, this.P3 = void 0, this.line1 = void 0, this.line2 = void 0, this.nodes = void 0, (e = this.selection) == null || e.destroy(), this.selection = void 0;
  }
};
function po({ pT: e, pL: t, pW: n, pH: o, cT: i, cL: s, cW: r, cH: c, direction: l, containerHeight: d }) {
  let a = t + n / 2;
  const u = e + o / 2;
  let h;
  l === L.LHS ? h = s + r : h = s;
  const p = i + c / 2, v = (1 - Math.abs(p - u) / d) * 0.25 * (n / 2);
  return l === L.LHS ? a = a - n / 10 - v : a = a + n / 10 + v, `M ${a} ${u} Q ${a} ${p} ${h} ${p}`;
}
function mo({ pT: e, pL: t, pW: n, pH: o, cT: i, cL: s, cW: r, cH: c, direction: l, isFirst: d }) {
  const a = parseInt(this.container.style.getPropertyValue("--gap"));
  let u = 0, h = 0;
  d ? u = e + o / 2 : u = e + o;
  const p = i + c;
  let g = 0, v = 0, m = 0;
  const f = Math.abs(u - p) / 300 * a;
  return l === L.LHS ? (m = t, g = m + a, v = m - a, h = s + a, `M ${g} ${u} C ${m} ${u} ${m + f} ${p} ${v} ${p} H ${h}`) : (m = t + n, g = m - a, v = m + a, h = s + r - a, `M ${g} ${u} C ${m} ${u} ${m - f} ${p} ${v} ${p} H ${h}`);
}
const go = "4.5.2", G = document;
function D({
  el: e,
  direction: t,
  locale: n,
  draggable: o,
  editable: i,
  contextMenu: s,
  contextMenuOption: r,
  toolBar: c,
  keypress: l,
  mouseSelectionButton: d,
  selectionContainer: a,
  before: u,
  newTopicName: h,
  allowUndo: p,
  generateMainBranch: g,
  generateSubBranch: v,
  overflowHidden: m,
  theme: f,
  alignment: b
}) {
  let x = null;
  const E = Object.prototype.toString.call(e);
  if (E === "[object HTMLDivElement]" ? x = e : E === "[object String]" && (x = document.querySelector(e)), !x)
    throw new Error("MindElixir: el is not a valid element");
  x.style.position = "relative", x.innerHTML = "", this.mindElixirBox = x, this.disposable = [], this.before = u || {}, this.locale = n || "en", this.contextMenuOption = r, this.contextMenu = s === void 0 ? !0 : s, this.toolBar = c === void 0 ? !0 : c, this.keypress = l === void 0 ? !0 : l, this.mouseSelectionButton = d || 0, this.direction = typeof t == "number" ? t : 1, this.draggable = o === void 0 ? !0 : o, this.newTopicName = h || "new node", this.editable = i === void 0 ? !0 : i, this.allowUndo = p === void 0 ? !1 : p, this.currentNode = null, this.currentArrow = null, this.scaleVal = 1, this.tempDirection = null, this.generateMainBranch = g || po, this.generateSubBranch = v || mo, this.overflowHidden = m || !1, this.bus = it.create(), this.container = G.createElement("div"), this.selectionContainer = a || this.container, this.container.className = "map-container";
  const y = window.matchMedia("(prefers-color-scheme: dark)");
  this.theme = f || (y.matches ? Re : Be);
  const w = G.createElement("div");
  w.className = "map-canvas", this.map = w, this.map.setAttribute("tabindex", "0"), this.container.appendChild(this.map), this.mindElixirBox.appendChild(this.container), this.nodes = G.createElement("me-nodes"), this.nodes.className = "main-node-container", this.lines = J("lines"), this.summarySvg = J("summary"), this.linkController = J("linkcontroller"), this.P2 = G.createElement("div"), this.P3 = G.createElement("div"), this.P2.className = this.P3.className = "circle", this.P2.style.display = this.P3.style.display = "none", this.line1 = Ne(), this.line2 = Ne(), this.linkController.appendChild(this.line1), this.linkController.appendChild(this.line2), this.linkSvgGroup = J("topiclinks"), this.alignment = b ?? "root", this.map.appendChild(this.nodes), this.overflowHidden ? this.container.style.overflow = "hidden" : ot(this);
}
D.prototype = fo;
D.LEFT = $;
D.RIGHT = P;
D.SIDE = ae;
D.THEME = Be;
D.DARK_THEME = Re;
D.version = go;
D.E = S;
D.new = (e) => ({
  nodeData: {
    id: U(),
    topic: e || "new topic",
    children: []
  }
});
D.dragMoveHelper = k;
export {
  D as default
};
