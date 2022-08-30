let id_attr = [ "id": [ TemplateItemOption( "id" ) { d in d } ] ]

let basic_styles =
[ "textAlignment":
    [ TemplateItemOption( "class" ) { text in
        text == "natural" ? "text-start"
      : text == "center"  ? "text-center"
      : text == "left"    ? "text-start"
      : text == "right"   ? "text-end"
      :                     "text-start" }
    ]
  
  
, "alignment":
    [ TemplateItemOption( "class" ) {
        a in
        a == "center"   ? "align-items-center"
      : a == "leading"  ? "align-items-start"
      : a == "trailing" ? "align-items-end"
      :                   "align-items-end"
    } ]
  
  
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

, "color":
        [ TemplateItemOption( "style" ) {
            rgba in "color: \(rgba)"
        } ]

, "backgroundColor":
          [ TemplateItemOption( "style" ) {
              rgba in "background-color: \(rgba)"
          } ]

  
, "flex":
            [ TemplateItemOption( "style" ) {
                f in "flex: \(f)"
            } ]
].merging( id_attr ) { (o,n) in n }

func with_basic_style ( _ d: [String:[TemplateItemOption]] ) -> [String:[TemplateItemOption]] {
    return d.merging( basic_styles ){ old, new in old }
}

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
  TemplateItem("<div id=\"{id}\">{children}</div>", id_attr )
, "navigationController":
  TemplateItem("<div  id=\"{id}\">{children}</div>", id_attr)
, "tableViewController":
  TemplateItem("<div  id=\"{id}\">{children}</div>", id_attr)
, "view":
  TemplateItem("<div class=\"d-flex flex-column\" id=\"{id}\">{children}</div>", id_attr )
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
  TemplateItem( "<div {outlet}>{text}</div>"
              , with_basic_style(
                [ "text": [ TemplateItemOption( "text" ) { text in text } ] ] ) )
, "button":
  TemplateItem("<button type=\"button\" class=\"btn btn-primary\" {outlet}>{children}</button>"
              , [ "state-normal":
                    [ TemplateItemOption( "children" ){ stateNormal in stateNormal } ] ] )
, "textField":
  TemplateItem("<input {outlet} placeholder=\"{placeholder}\" />"
              , with_basic_style(
                [ "placeholder":
                    [ TemplateItemOption( "placeholder" ){ p in p } ]
                ]) )
, "toolbar": TemplateItem("<div class=\"d-flex d-flex-row px-3 flex-grow-1\" {outlet}>{children}</div>")
, "imageView":
  TemplateItem("<div id=\"{id}\">{children}</div>", id_attr)
, "segmentedControl":
  TemplateItem("<div class=\"d-flex flex-row flex-grow-1\" id=\"{id}\">{children}</div>", id_attr)
, "segments":
    TemplateItem("<div class=\"btn-group flex-grow-1\">{children}</div>")
, "segment":
  TemplateItem( "<label class=\"btn btn-outline-primary\"><input type=\"checkbox\" class=\"btn-check\" autocomplete=\"off\" {outlet}>{text}</label>"
              , [ "title": [ TemplateItemOption( "text" ){ text in text } ] ]
              )
, "switch":
  TemplateItem("<div id=\"{id}\">{children}</div>", id_attr)
, "slider":
  TemplateItem("<div id=\"{id}\">{children}</div>", id_attr)
, "progressView":
  TemplateItem("<div id=\"{id}\">{children}</div>", id_attr)
, "activityIndicatorView":
  TemplateItem("<div id=\"{id}\">{children}</div>", id_attr)
, "pageControl":
  TemplateItem("<div id=\"{id}\">{children}</div>", id_attr)
, "stepper":
  TemplateItem("<div id=\"{id}\">{children}</div>", id_attr)
, "tableView":
  TemplateItem("<div class=\"d-flex flex-column\" id=\"{id}\">{children}</div>", id_attr)
, "tableViewSection":
  TemplateItem("<div id=\"{id}\"><div class=\"text-secondary ps-2 pt-4\">{header}</div>{children}</div>"
               , [ "headerTitle": [ TemplateItemOption( "header" ){ title in title } ] ]
                 .merging( id_attr ){ (o,n) in n } )
, "tableViewCell":
    TemplateItem( "<div class=\"d-flex d-flex-row align-items-center\" id=\"{id}\"><div class=\"flex-grow-1\">{children}</div>{accessory}</div>"
                , [ "accessoryType":
                        [ TemplateItemOption( "accessory" ){ icon in
                            "<i class=\"\(ios_cell_icon_to_awesome_font( icon ))\"></i>" }
                        ]
                  , "rowHeight":
                        [TemplateItemOption( "style" ){ height in "height: \(height)px" }  ]
                  ].merging( id_attr ){ (o,n) in n }
                )
, "tableViewCellContentView": TemplateItem("<div id=\"{id}\">{children}</div>", with_basic_style([:]) )
, "collectionView":
  TemplateItem("<div id=\"{id}\">{children}</div>", id_attr)
, "collectionViewFlowLayout":
  TemplateItem("<div id=\"{id}\">{children}</div>", id_attr)
, "collectionViewCell":
  TemplateItem("<div id=\"{id}\">{children}</div>", id_attr)
, "stackView":
  TemplateItem( "<div id=\"{id}\" class=\"d-flex\">{children}</div>"
  , [ "axis":
        [ TemplateItemOption( "class" ) {  axis in axis == "vertical" ? "flex-column" : "flex-row" } ]
    ] )
, "tabBar":
    TemplateItem("<div id=\"{id}\" class=\"bg-light d-flex flex-row justify-content-space-between position-fixed bottom-0 left-0 right-0 vw-100 px-3 py-2\" {outlet}>{children}</div>", id_attr)
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
  
, "connections":
    TemplateItem("<connections>{children}</connections>")
, "segue":
    TemplateItem("<segue relationship=\"{relationship}\" kind=\"{kind}\"  destination=\"{destination}\" id=\"{id}\"></segue>"
      , [ "relationship": [ TemplateItemOption( "relationship" ){ d in d } ]
        , "destination": [ TemplateItemOption( "destination" ) { d in d } ]
        , "kind": [ TemplateItemOption( "kind" ) { d in d } ]
        , "id": [ TemplateItemOption( "id" ) { d in d } ]
        ] )
, "outlet":
    TemplateItem("<outlet property=\"{property}\" destination=\"{destination}\" id=\"{id}\"></outlet>"
    , [ "property": [ TemplateItemOption( "property" ){ d in d } ]
      , "destination": [ TemplateItemOption( "destination" ) { d in d } ]
      , "id": [ TemplateItemOption( "id" ) { d in d } ]
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
