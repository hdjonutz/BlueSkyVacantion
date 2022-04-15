
Tables
* https://mui.com/components/data-grid/filtering/
* https://reactdatagrid.io/docs/getting-started
* https://morioh.com/p/c08ee0fb54b6

16.12.2021 - 4h
* https://www.ag-grid.com/license-pricing.php


18.12.2021 - 7h (photoshop)
* https://www.brusheezy.com/brushes/58420-free-fog-photoshop-brushes-16
* https://pngtree.com/so/blue-smoke
* https://www.wallpaperflare.com/blue-and-white-abstract-painting-studio-shot-indoors-motion-wallpaper-pcjme
*  https://stock.adobe.com/de/images/id/417501222?as_campaign=Freepik&as_content=api&as_audience=srp&tduid=d296857a23390df7f008ab56c5ee41d6&as_channel=affiliate&as_campclass=redirect&as_source=arvato


19.12.2021 -7h filters
* https://wall.alphacoders.com/by_sub_category.php?id=93115&name=Yacht+Wallpapers
I18nextProvider
* https://github.com/mui-org/material-ui-pickers/issues/240

20.12.2021
``` 
    <TextField
        {...params}
        helperText={null}
        sx={{
            svg: { color: '#c44242' },
            input: { color: '#c44242' },
            label: { color: '#c44242' },
            fieldset: { borderColor: '#c44242' }
        }}
    />
```
Theme
````
    MuiIconButton: {
        styleOverrides: {
        sizeMedium: {
            color
        }
        }
    },
    MuiOutlinedInput: {
        styleOverrides: {
        root: {
            color
        }
        }
    },
    MuiInputLabel: {
        styleOverrides: {
        root: {
            color
        }
        }
    },
````

20.12.2021  -4h React Table - automatics filters
bad calling hook
* https://reactjs.org/warnings/invalid-hook-call-warning.html
````
function Bad1() {
  function handleClick() {
    // 🔴 Bad: inside an event handler (to fix, move it outside!)
    const theme = useContext(ThemeContext);
  }
  // ...
}

function Bad2() {
  const style = useMemo(() => {
    // 🔴 Bad: inside useMemo (to fix, move it outside!)
    const theme = useContext(ThemeContext);
    return createStyle(theme);
  });
  // ...
}

class Bad3 extends React.Component {
  render() {
    // 🔴 Bad: inside a class component
    useEffect(() => {})
    // ...
  }
}
````
table editable 
* Editable https://reactdatagrid.io/docs/api-reference#props-editable
* useCallback:  https://stackoverflow.com/questions/62304352/react-usecallback-usecallback-with-empty-dependency-array-vs-not-using-usecal

learn more by using
````
const onSortInfoChange = useCallback(sortInfo => {
    const newData = !sortInfo?[].concat(people):[].concat(people).sort(getComparer(sortInfo))

    setSortInfo(sortInfo)
    setDataSource(newData)
  }, [])
  // link https://reactdatagrid.io/docs/api-reference#props-sortInfo
  ````
21.12.2021
Fehler: window.momnet is not a Function
Solution: 
````
  module: {
    rules: [
        {
            // At some places (e.g. inline onclick handlers in HTML code) we use jquery without importing the
            // module. For these cases we have to define it globally.
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            },{
                loader: 'expose-loader',
                options: '$'
            }]
        }
    ],
      .....
  }
````
* https://github.com/webpack-contrib/expose-loader

22.12.2021 icons - 2h

react task gantt 
* https://github.com/MaTeMaTuK/gantt-task-react
example :
* https://codesandbox.io/s/8gvqm
* https://codesandbox.io/examples/package/gantt-task-react 

23.12.2021  -2h

file:///E:/Projects/giulia-romano.com/web/bundles/vcms/frontend/jquery-slider-master/transitions/slideshow-transitions(360).html
file:///E:/Projects/giulia-romano.com/web/bundles/vcms/frontend/jquery-slider-master/transition-builder/tool-slideshow-transition-builder.html
https://www.boataround.com/
https://skiathossailing.eu/
https://www.yachting.com/de-de/boot/06188/oceanis-411-kos-411

LINKS: FREE HOSTING:
1 - https://www.techradar.com/web-hosting/best-free-web-hosting
2 - https://www.webhostingsecretrevealed.net/blog/web-hosting-guides/free-hosting-sites/#hostinger


Templates -slider
https://masterslider.com/extra/templates/
https://www.masterslider.com/template/interior-design-slider/
https://www.masterslider.com/template/grid-layout-slider-sample/
https://www.masterslider.com/template/new-releases-music-album-slider/
https://www.masterslider.com/template/new-releases-music-album-slider/


!!   file:///E:/master-slider-jquery-touch-swipe-slider/slider-templates/modern-sliders/Grid/index.html
!!   file:///E:/master-slider-jquery-touch-swipe-slider/slider-templates/modern-sliders/Journey/index.html
!!   file:///E:/master-slider-jquery-touch-swipe-slider/slider-templates/modern-sliders/Memorial/index.html
!!   file:///E:/master-slider-jquery-touch-swipe-slider/slider-templates/modern-sliders/Music%20Album/index.html
!!   file:///E:/master-slider-jquery-touch-swipe-slider/slider-templates/modern-sliders/Offroad/index.html
??   file:///E:/master-slider-jquery-touch-swipe-slider/slider-templates/modern-sliders/Outdoor/index.html
!!   file:///E:/master-slider-jquery-touch-swipe-slider/slider-templates/modern-sliders/Panorama/index.html
!!   file:///E:/master-slider-jquery-touch-swipe-slider/slider-templates/modern-sliders/Parallax%20Follow%20Mouse/index.html
!!   file:///E:/master-slider-jquery-touch-swipe-slider/slider-templates/modern-sliders/Parallax%20Swipe%201/index.html
!!   file:///E:/master-slider-jquery-touch-swipe-slider/slider-templates/modern-sliders/Presentation%203/index.html
!!   file:///E:/master-slider-jquery-touch-swipe-slider/slider-templates/modern-sliders/Testimonial%202/index.html
!!   file:///E:/master-slider-jquery-touch-swipe-slider/slider-templates/modern-sliders/Wedding%201/index.html
!!   file:///E:/master-slider-jquery-touch-swipe-slider/slider-templates/modern-sliders/Wildlife/index.html
???  https://www.jssor.com/demos/ski/ski.slider
**** file:///E:/Projects/giulia-romano.com/web/bundles/vcms/frontend/jquery-slider-master/transitions/slideshow-transitions(360).html
**** file:///E:/Projects/giulia-romano.com/web/bundles/vcms/frontend/jquery-slider-master/transition-builder/tool-slideshow-transition-builder.html
???  https://preview.themeforest.net/item/oriel-responsive-interior-design-wordpress-theme/full_screen_preview/11160898
file:///E:/master-slider-jquery-touch-swipe-slider/slider-templates/modern-sliders/Hero%20Header%202/index.html




ACCOUNT TEST HOST 
1 -----------------------------
	https://client.googiehost.com/cart.php?a=checkout&e=false
	name: Teodor Vasile
	email: teodorvasile180@gmail.com
	tenumber: 	017633322295
	pass: we?&20TeEst22

	Fasanenstraße 12-13
	10623 Berlin

	Your Order Number is: 5757104247
	logIn: https://client.googiehost.com/index.php/user/verify/5cb59c5bfc74685d437428da188f2aae6f9b36df52ad3db26b9df7bc0270719c
	https://client.googiehost.com/clientarea.php?action=details

2 -----------------------------
	https://www.000webhost.com/members/verify/7bfd94780023d67cc88a4252f64f1d0bdde83fea
	name: Teodor Vasile
	email: teodorvasile180@gmail.com
	user(name_project): yachting
	pass: Fy^YYa!ipq$YJWT$PEAn
	blueskyinline / C1v4U8cNnA#Z6EZntQl&
	https://blueskyinline.000webhostapp.com/
	https://blueskyinline.000webhostapp.com/#/online/home
https://de.000webhost.com/cpanel-login
DBpass: 1&40R?Yrbs8oJh@u
	
	

  <!DOCTYPE html>
<html>
<head>
<style>
.sq{
  position: absolute;
  left: 10px;
  width: 100px;
  height: 100px;
  background: red;
  transition: all 2s;
}
.sq.start {
  left: 400px;
}
</style>
<script type="text/javascript">
   var i = 0; 
   window.setInterval(() => {
      const tmp = document.getElementsByClassName('sq')[0];
      if (i%2 == 0){
	     tmp.classList.add("start");
	  } else {
         tmp.classList.remove("start");
      }
      i = i + 1;
   }, 2000);
</script>
</head>
<body>

<h1>The transition Property</h1>

<p>Hover over the div element below, to see the transition effect:</p>
<div class="sq"></div>

</body>
</html>
// https://www.w3schools.com/css/tryit.asp?filename=trycss3_transition1

22.02.2022  4h
23.02.2022  4h
13.03.2022
https://app.diagrams.net/
diagram table


icons
https://www.vectorstock.com/royalty-free-vector/set-icons-of-motor-and-engine-vector-4786538
https://www.vectorstock.com/royalty-free-vector/plane-propellers-motion-symbols-jet-aviation-vector-28974119
