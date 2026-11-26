<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
    xmlns:html="http://www.w3.org/TR/REC-html40"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>XML Sitemap | Fuji Japanese Academy</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <style type="text/css">
					body {
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
						color: #333;
						margin: 20px;
						background: #f8f9fa;
					}
					.logo-container {
						display: flex;
						align-items: center;
						gap: 15px;
						margin-bottom: 30px;
					}
					.logo {
						width: 50px;
						height: 50px;
						border-radius: 50%;
						box-shadow: 0 4px 10px rgba(0,0,0,0.1);
						border: 2px solid white;
					}
					.title-container h1 { 
						margin: 0;
						color: #d90429; 
						font-size: 24px; 
					}
					.title-container p {
						margin: 4px 0 0 0;
						color: #2b2d42;
						font-weight: 600;
						font-size: 12px;
						letter-spacing: 0.1em;
						text-transform: uppercase;
					}
					#intro { background-color: #f1f3f5; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; line-height: 1.6; border-left: 4px solid #d90429; }
					table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
					th { background: #2b2d42; color: white; text-align: left; padding: 12px 15px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; }
					td { padding: 12px 15px; border-top: 1px solid #eee; font-size: 14px; }
					tr:hover td { background: #fff5f5; }
					a { color: #d90429; text-decoration: none; }
					a:hover { text-decoration: underline; }
					.priority-high { color: #d90429; font-weight: bold; }
					.priority-low { color: #666; }
					#footer { margin-top: 30px; font-size: 12px; color: #999; text-align: center; }
                </style>
            </head>
            <body>
                <div class="logo-container">
                    <img src="/logo.png" alt="Fuji Japanese Academy" class="logo" />
                    <div class="title-container">
                        <h1>Fuji Japanese Academy</h1>
                        <p>Japanese Language Institute</p>
                    </div>
                </div>
                <div id="intro">
                    <p> This is an XML Sitemap generated to help search engines like Google and Bing crawl the website more efficiently.<br/>
						You can find more information about XML sitemaps at <a href="https://sitemaps.org">sitemaps.org</a>.
                </p>
            </div>
            <div id="content">
                <table>
                    <tr>
                        <th width="70%">URL</th>
                        <th width="10%">Priority</th>
                        <th width="10%">Change Freq.</th>
                        <th width="10%">Last Modified</th>
                    </tr>
                    <xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'"/>
                    <xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
                    <xsl:for-each select="sitemap:urlset/sitemap:url">
                        <tr>
                            <td>
                                <xsl:variable name="itemURL">
                                    <xsl:value-of select="sitemap:loc"/>
                                </xsl:variable>
                                <a href="{$itemURL}">
                                    <xsl:value-of select="sitemap:loc"/>
                                </a>
                            </td>
                            <td>
                                <xsl:choose>
                                    <xsl:when test="sitemap:priority &gt;= 0.8">
                                        <span class="priority-high">
                                            <xsl:value-of select="sitemap:priority"/>
                                        </span>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <span class="priority-low">
                                            <xsl:value-of select="sitemap:priority"/>
                                        </span>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </td>
                            <td>
                                <xsl:value-of select="sitemap:changefreq"/>
                            </td>
                            <td>
                                <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </div>
            <div id="footer">
					Generated by Fuji Japanese Academy - 2026
            </div>
        </body>
    </html>
</xsl:template>
</xsl:stylesheet>
