class _DefaultEnumImplementation {
    static $equal(a, b, $info){return (a && a.rawValue) == (b && b.rawValue)}
    static $notEqual(a, b, $info){return !this.$equal(a, b, $info)}
}