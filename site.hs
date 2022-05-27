--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
import           Control.Monad
import           Data.Monoid         (mappend)
import           Data.String         (fromString)
import           Hakyll
import           Text.Pandoc.Options

--------------------------------------------------------------------------------
config :: Configuration
config = defaultConfiguration
  { destinationDirectory = "docs"
  }
--------------------------------------------------------------------------------
main :: IO ()
main = hakyllWith config $ do
        forM_ [ "CNAME"
              , "resources/**"
              , "fonts/**"
              ] $ \f -> match f $ do
            route   idRoute
            compile copyFileCompiler

        match "css/*" $ do
            route   idRoute
            compile compressCssCompiler

        match "pages/**.html" $ do
            route pageRoute
            compile $ compileWithDefaultOptions getResourceBody

        match "pages/**.markdown" $ do
            route $ pageRoute `composeRoutes` setExtension "html"
            compile $ compileWithDefaultOptions fullPandocCompiler

        match "js/**" $ do
            route idRoute
            compile copyFileCompiler --todo minify or something

        match "templates/*" $ compile templateBodyCompiler

        match "misc/**" $ do
            route miscRoute
            compile copyFileCompiler
--------------------------------------------------------------------------------
globalReaderOptions :: ReaderOptions
globalReaderOptions = defaultHakyllReaderOptions

globalWriterOptions :: WriterOptions
globalWriterOptions = defaultHakyllWriterOptions

mathReaderOptions :: ReaderOptions
mathReaderOptions =  globalReaderOptions {
    readerExtensions =
        readerExtensions globalReaderOptions <> extensionsFromList [
            Ext_tex_math_single_backslash  -- TeX math btw (..) [..]
          , Ext_tex_math_double_backslash  -- TeX math btw \(..\) \[..\]
          , Ext_tex_math_dollars           -- TeX math between $..$ or $$..$$
          , Ext_latex_macros               -- Parse LaTeX macro definitions (for math only)
        ]
      }

mathWriterOptions :: WriterOptions
mathWriterOptions = globalWriterOptions {
        writerHTMLMathMethod = MathJax "" --render math
    }

mathPandocCompiler :: Compiler (Item String)
mathPandocCompiler = pandocCompilerWith mathReaderOptions mathWriterOptions

fullPandocCompiler :: Compiler (Item String)
fullPandocCompiler = do
  identifier <- getUnderlying
  s <- getMetadataField identifier "katex"
  case s of
    Just "on"   -> mathPandocCompiler
    Just "true" -> mathPandocCompiler
    _           -> pandocCompiler


postCtx :: Context String
postCtx =
    dateField "date" "%B %e, %Y" `mappend`
    defaultContext


makeBooleanContext :: String -> String -> Context a
makeBooleanContext fieldName stringToUse = field fieldName $ \item -> do
    f <- getMetadataField (itemIdentifier item) fieldName
    return $ case f of
        Just "true" -> stringToUse
        Just "on"   -> stringToUse
        _           -> ""


katexScriptString :: String
katexScriptString = "<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/katex@0.15.6/dist/katex.min.css\" integrity=\"sha384-ZPe7yZ91iWxYumsBEOn7ieg8q/o+qh/hQpSaPow8T6BwALcXSCS6C6fSRPIAnTQs\" crossorigin=\"anonymous\">\n<script defer src=\"https://cdn.jsdelivr.net/npm/katex@0.15.6/dist/katex.min.js\" integrity=\"sha384-ljao5I1l+8KYFXG7LNEA7DyaFvuvSCmedUf6Y6JI7LJqiu8q5dEivP2nDdFH31V4\" crossorigin=\"anonymous\"></script>\n<script defer src=\"https://cdn.jsdelivr.net/npm/katex@0.15.6/dist/contrib/auto-render.min.js\" integrity=\"sha384-+XBljXPPiv+OzfbB3cVmLHf4hdUFHlWNZN5spNQ7rmHTXpd7WvJum6fIACpNNfIR\" crossorigin=\"anonymous\" onload=\"renderMathInElement(document.body);\"></script>\n"

mathContext :: Context a
mathContext = makeBooleanContext "katex" katexScriptString

makeListOfStringsContext :: String -> String -> (String -> String) -> Context a
makeListOfStringsContext fieldName subfieldName subFieldF = listFieldWith fieldName ctx (\item -> do
    rawlist <- getMetadataField (itemIdentifier item) fieldName

    return $ makeList rawlist
    ) where
        makeList (Just l) = map (makeItem . trim) $ splitAll "," l
        makeList Nothing  = []
        ctx = field subfieldName (return . itemBody)
        makeItem i = Item {
            itemIdentifier = fromString i,
            itemBody = fromString $ subFieldF i
        }

includesContext :: Context String
includesContext = makeListOfStringsContext "includes" "include" (\s -> "/js/" ++ s ++ ".js")

externIncludesContext :: Context String
externIncludesContext = makeListOfStringsContext "extincludes" "include" id

fullContext :: Context String
fullContext = externIncludesContext
           <> includesContext
           <> mathContext
           <> defaultContext

pageRoute :: Routes
pageRoute = gsubRoute "pages/" (const "")

miscRoute :: Routes
miscRoute = gsubRoute "misc/" (const "")

compileWithDefaultOptions :: Compiler (Item String) -> Compiler (Item String)
compileWithDefaultOptions c = do
    c >>= loadAndApplyTemplate "templates/default.html" fullContext
      >>= relativizeUrls
