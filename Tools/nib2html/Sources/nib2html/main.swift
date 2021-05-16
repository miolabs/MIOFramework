
import ArgumentParser
import Foundation

struct nib2html: ParsableCommand {
    @Option(name: .shortAndLong, help: "Output path where the files will be generated.")
    var outputPath: String?
    
    @Argument(help: "The nib or storyboard filename.")
    var nibFileName: String
    
    mutating func run() throws {
        let parser = NIBParser(contentsOf: URL(string:nibFileName)!)
        parser.parse()
   }
}
    
    
nib2html.main()


