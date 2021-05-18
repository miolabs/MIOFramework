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
          size_in_px in
            "font-size: \(size_in_px)px"
      } ]
]


public let HTML_BOOTSTRAP5 =
[ "scene":
  TemplateItem(
    "<!DOCTYPE html><html><head><link rel=\"stylesheet\" type=\"text/css\" href=\"bootstrap.min.css\"></head><body>{children}</body></html>"
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
  TemplateItem("<nav class=\"navbar\" {outlet}><div class=\"container-fluid\">{children}</div></nav>")
, "navigationItem":
  TemplateItem("<div {outlet}>{children}</div>")
, "barButtonItem":
  TemplateItem("<button type=\"button\" class=\"btn btn-outline-primary\" {outlet}>{children}</button>")
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
, "toolbar":
  TemplateItem("<div {outlet}>{children}</div>")
, "imageView":
  TemplateItem("<div {outlet}>{children}</div>")
, "segmentedControl":
  TemplateItem("<div {outlet}>{children}</div>")
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
  TemplateItem("<table class=\"\" {outlet}><tbody>{children}<tbody></table>")
, "tableViewCell":
  TemplateItem("<div {outlet}>{children}</div>")
, "tableViewCellContentView":
  TemplateItem("<div {outlet}>{children}</div>")
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
]

