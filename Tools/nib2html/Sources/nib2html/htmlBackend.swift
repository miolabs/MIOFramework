let basic_styles =
[ "textAlignment": [ TemplateItemOption( "class" ) { text in text == "natural" ? "text-left" : "text-\(text)" } ]
, "borderStyle":
    [ TemplateItemOption( "class" ) {
        border in
          border == "rounded" ? "rounded"
        : border == "bezel" ? ""
        : border == "line" ? ""
        : ""
    } ]

, "contentHorizontalAlignment":
    [ TemplateItemOption( "class" ) {
        border in
          border == "right"  ? "justify-content-end"
        : border == "center" ? "justify-content-center"
        : border == "left"   ? "justify-content-start"
        : ""
    } ]

, "contentVerticalAlignment":
    [ TemplateItemOption( "class" ) {
        border in
        border == "right"  ? "align-items-end"
      : border == "center" ? "align-items-center"
      : border == "left"   ? "align-items-start"
        : ""
    } ]

, "fontSize":
      [ TemplateItemOption( "style" ) {
          size_in_pt in
            "font-size: \(size_in_pt)pt"
      } ]
]


public let HTML_BOOTSTRAP5 =
[ "scene":
  TemplateItem( """
<!DOCTYPE html>
 <html>
  <head>
   <link rel="stylesheet" type="text/css" href="bootstrap.min.css">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
 </head>
 <body>{children}</body>
</html>
"""
  )
, "viewController":
  TemplateItem("<div {outlet}>{children}</div>")
, "navigationController":
  TemplateItem("<div {outlet}>{children}</div>")
, "tableViewController":
  TemplateItem("<div {outlet}>{children}</div>")
, "view":
  TemplateItem("<div class=\"d-flex flex-column\"  {outlet}>{children}</div>")
, "navigationBar":
  TemplateItem("<nav class=\"navbar position-fixed top-0 left-0 right-0 vw-100\" {outlet}><div class=\"container-fluid\">{children}</div></nav>")
, "navigationItem":
    TemplateItem( "<div class=\"d-flex flex-row flex-nowrap justify-content-center flex-grow-1 align-items-center\" {outlet}>" +
                    "<div class=\"order-1 d-flex justify-content-center flex-grow-1\">{text}</div>" +
                    "{children}" +
                  "</div>"
                , [ "title": [ TemplateItemOption( "text" ){ text in text } ] ] )
, "barButtonItem":
  TemplateItem("{children}"
               , [ "key": [ TemplateItemOption( "class" ) { key in key == "rightBarButtonItem" ? "order-2" : "order-0" } ]
                 , "title": [ TemplateItemOption( "children" ){ text in
                                "<button type=\"button\" class=\"btn btn-outline-primary border-0\" {outlet}>\(text)</button>" } ]
                 , "image": [ TemplateItemOption( "children" ){ text in
                                "<button type=\"button\" class=\"btn btn-outline-primary border-0\" {outlet}><i class=\"\(ios_to_awesome_font(text))\"></i></button>" }
                            ]
                 ] )
, "label":
  TemplateItem( "<span {outlet}>{text}</span>"
              , [ "text": [ TemplateItemOption( "text" ) { text in text } ]
                ].merging( basic_styles ){ old, new in old } )
, "button":
  TemplateItem("<button type=\"button\" class=\"btn btn-primary\" {outlet}>{children}</button>"
              , [ "state-normal":
                    [ TemplateItemOption( "children" ){ stateNormal in stateNormal } ] ] )
, "textField":
  TemplateItem("<input {outlet} />", basic_styles )
, "toolbar": TemplateItem("<div class=\"d-flex d-flex-row px-3 flex-grow-1\" {outlet}>{children}</div>")
, "imageView":
  TemplateItem("<div {outlet}>{children}</div>")
, "segmentedControl":
  TemplateItem("<div class=\"d-flex flex-row flex-grow-1\" {outlet}>{children}</div>")
, "segments":
    TemplateItem("<div class=\"btn-group flex-grow-1\">{children}</div>")
, "segment":
  TemplateItem( "<label class=\"btn btn-outline-primary\"><input type=\"checkbox\" class=\"btn-check\" autocomplete=\"off\" {outlet}>{text}</label>"
              , [ "title": [ TemplateItemOption( "text" ){ text in text } ] ]
              )
, "switch":
  TemplateItem("<div {outlet}>{children}</div>")
, "slider":
  TemplateItem("<div {outlet}>{children}</div>")
, "progressView":
  TemplateItem("<div {outlet}>{children}</div>")
, "activityIndicatorView":
  TemplateItem("<div {outlet}>{children}</div>")
, "pageControl":
  TemplateItem("<div {outlet}>{children}</div>")
, "stepper":
  TemplateItem("<div {outlet}>{children}</div>")
, "tableView":
  TemplateItem("<div class=\"d-flex flex-column\" {outlet}>{children}</div>")
, "tableViewCell":
    TemplateItem( "<div class=\"d-flex d-flex-row align-items-center\" {outlet}><div class=\"flex-grow-1\">{children}</div>{accessory}</div>"
                , [ "accessoryType": [ TemplateItemOption( "accessory" ){ icon in "<i class=\"\(ios_cell_icon_to_awesome_font( icon ))\"></i>" } ]
                  , "rowHeight": [TemplateItemOption( "style" ){ height in "height: \(height)px" }  ] ]
                )
, "tableViewCellContentView": TemplateItem("{children}")
, "collectionView":
  TemplateItem("<div {outlet}>{children}</div>")
, "collectionViewFlowLayout":
  TemplateItem("<div {outlet}>{children}</div>")
, "collectionViewCell":
  TemplateItem("<div {outlet}>{children}</div>")
, "stackView":
  TemplateItem( "<div {outlet} class=\"d-flex\">{children}</div>"
  , [ "axis":
        [ TemplateItemOption( "class" ) {  axis in axis == "vertical" ? "flex-column" : "flex-row" } ]
    ] )
, "tabBar":
    TemplateItem("<div class=\"bg-light d-flex flex-row justify-content-space-between position-fixed bottom-0 left-0 right-0 vw-100 px-3 py-2\" {outlet}>{children}</div>")
 , "tabBarItem":
      TemplateItem( "<div class=\"d-flex flex-grow-1 flex-column align-items-center\" style=\"height:40px\" {outlet}>" +
                      "<i class=\"{icon}\"></i>" +
                      "<div class=\"\">{title}</div>" +
                    "</div>"
        , [
            "systemItem":
                [ TemplateItemOption( "title" ) {  text in text }
                , TemplateItemOption( "icon" ) {  icon in ios_system_to_awesome_font( icon ) }
                ]
          , "title": [ TemplateItemOption( "title" ) { text in text } ]
          , "image": [ TemplateItemOption( "icon" ) { icon in ios_to_awesome_font( icon ) } ]
          ] )
]


func ios_to_awesome_font ( _ image: String ) -> String {
    switch image {
        case "pencil" : return "fas fa-edit"
        default: return "fas fa-exclamation-circle" // <== shows error icon
    }
}

func ios_system_to_awesome_font ( _ image: String ) -> String {
    switch image {
        case "favorites" : return "fas fa-star"
        default: return "fas fa-exclamation-circle" // <== shows error icon
    }
}


func ios_cell_icon_to_awesome_font ( _ image: String ) -> String {
    switch image {
        case "disclosureIndicator" : return "fas fa-chevron-right"
        case "information" : return "fas fa-info-circle" // <i class="fal fa-info-circle"></i> <== PRO version
        default: return "fas fa-exclamation-circle" // <== shows error icon
    }
}
