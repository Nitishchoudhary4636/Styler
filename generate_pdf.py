"""
PDF Generator for JavaScript Functions Documentation
This script converts the markdown documentation to PDF format
"""

import markdown
import pdfkit
from pathlib import Path
import os

def generate_pdf():
    """Generate PDF from markdown documentation"""
    
    # Read the markdown file
    md_file_path = r"c:\Users\ASUS\Desktop\Styler\JavaScript_Functions_Documentation.md"
    
    try:
        with open(md_file_path, 'r', encoding='utf-8') as file:
            markdown_content = file.read()
        
        # Convert markdown to HTML
        html_content = markdown.markdown(
            markdown_content, 
            extensions=['codehilite', 'fenced_code', 'tables', 'toc']
        )
        
        # Add CSS styling for better PDF appearance
        styled_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Styler E-commerce JavaScript Functions Documentation</title>
            <style>
                body {{
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }}
                h1, h2, h3, h4, h5, h6 {{
                    color: #2c3e50;
                    margin-top: 24px;
                    margin-bottom: 12px;
                }}
                h1 {{
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 10px;
                }}
                h2 {{
                    border-bottom: 1px solid #bdc3c7;
                    padding-bottom: 5px;
                }}
                code {{
                    background-color: #f8f9fa;
                    padding: 2px 4px;
                    border-radius: 3px;
                    font-family: 'Courier New', Courier, monospace;
                    color: #e74c3c;
                }}
                pre {{
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    border-left: 4px solid #3498db;
                    overflow-x: auto;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 12px;
                }}
                blockquote {{
                    border-left: 4px solid #95a5a6;
                    margin: 0;
                    padding-left: 20px;
                    color: #7f8c8d;
                }}
                ul, ol {{
                    padding-left: 20px;
                }}
                li {{
                    margin-bottom: 5px;
                }}
                strong {{
                    color: #2c3e50;
                }}
                .page-break {{
                    page-break-before: always;
                }}
                @media print {{
                    body {{
                        font-size: 12px;
                    }}
                    h1 {{
                        font-size: 20px;
                    }}
                    h2 {{
                        font-size: 18px;
                    }}
                    h3 {{
                        font-size: 16px;
                    }}
                    pre {{
                        font-size: 10px;
                    }}
                }}
            </style>
        </head>
        <body>
            {html_content}
        </body>
        </html>
        """
        
        # PDF generation options
        pdf_options = {
            'page-size': 'A4',
            'margin-top': '0.75in',
            'margin-right': '0.75in',
            'margin-bottom': '0.75in',
            'margin-left': '0.75in',
            'encoding': "UTF-8",
            'no-outline': None,
            'enable-local-file-access': None
        }
        
        # Generate PDF
        output_path = r"c:\Users\ASUS\Desktop\Styler\JavaScript_Functions_Documentation.pdf"
        
        # Try to generate PDF
        try:
            pdfkit.from_string(styled_html, output_path, options=pdf_options)
            print(f"PDF successfully generated: {output_path}")
            return True
        except Exception as e:
            print(f"Error generating PDF with pdfkit: {e}")
            print("Trying alternative method...")
            return False
            
    except Exception as e:
        print(f"Error reading markdown file: {e}")
        return False

def generate_pdf_alternative():
    """Alternative PDF generation using weasyprint"""
    try:
        from weasyprint import HTML, CSS
        
        md_file_path = r"c:\Users\ASUS\Desktop\Styler\JavaScript_Functions_Documentation.md"
        
        with open(md_file_path, 'r', encoding='utf-8') as file:
            markdown_content = file.read()
        
        # Convert markdown to HTML
        html_content = markdown.markdown(
            markdown_content, 
            extensions=['codehilite', 'fenced_code', 'tables', 'toc']
        )
        
        # Create HTML document
        styled_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>JavaScript Functions Documentation</title>
        </head>
        <body>
            {html_content}
        </body>
        </html>
        """
        
        # CSS for styling
        css_style = """
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 40px;
        }
        h1, h2, h3, h4, h5, h6 {
            color: #2c3e50;
            margin-top: 24px;
            margin-bottom: 12px;
        }
        code {
            background-color: #f8f9fa;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        pre {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #3498db;
            font-family: 'Courier New', monospace;
            font-size: 11px;
        }
        """
        
        output_path = r"c:\Users\ASUS\Desktop\Styler\JavaScript_Functions_Documentation.pdf"
        HTML(string=styled_html).write_pdf(
            output_path,
            stylesheets=[CSS(string=css_style)]
        )
        
        print(f"PDF successfully generated with WeasyPrint: {output_path}")
        return True
        
    except ImportError:
        print("WeasyPrint not available")
        return False
    except Exception as e:
        print(f"Error with WeasyPrint: {e}")
        return False

if __name__ == "__main__":
    print("Generating PDF from JavaScript Functions Documentation...")
    
    # Try primary method first
    success = generate_pdf()
    
    # Try alternative if primary fails
    if not success:
        success = generate_pdf_alternative()
    
    # If both fail, provide instructions
    if not success:
        print("\nPDF generation failed. Please install required dependencies:")
        print("pip install markdown pdfkit")
        print("or")
        print("pip install markdown weasyprint")
        print("\nAlternatively, you can use online converters or pandoc:")
        print("pandoc JavaScript_Functions_Documentation.md -o JavaScript_Functions_Documentation.pdf")