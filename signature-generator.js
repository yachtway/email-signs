(function () {
  const ICON_BASE = "https://assets.yachtway.com/email-icons";
  const ASSETS = {
    iconWebsite: `${ICON_BASE}/web_outline.svg`,
    iconEmail: `${ICON_BASE}/mail_outline.svg`,
    iconPhone: `${ICON_BASE}/phone_outline.svg`,
    iconInstagram: `${ICON_BASE}/instagram_logo_solid.svg`,
    iconYoutube: `${ICON_BASE}/youtube_logo_solid.svg`,
    iconLinkedin: `${ICON_BASE}/linkedin_logo_solid.svg`,
    iconFacebook: `${ICON_BASE}/facebook_solid.svg`,
    iconMasterCover: `${ICON_BASE}/shield_outline.svg`,
    iconFinancing: `${ICON_BASE}/get_pre_qualified_outline.svg`,
    iconEasySign: `${ICON_BASE}/easysign_outline.svg`,
    iconStudio: `${ICON_BASE}/photo_camera_outline.svg`,
    iconCalendar: `${ICON_BASE}/calendar_outline.svg`,
  };
  const ICON_SIZE = 18;
  const PREVIEW_FONT_URL =
    "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Poppins:wght@400;500&display=swap";

  function ensurePreviewFonts() {
    if (typeof document === "undefined" || !document.head) {
      return;
    }

    const existing = document.querySelector(
      'link[data-signature-generator="fonts"]',
    );

    if (existing) {
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = PREVIEW_FONT_URL;
    link.setAttribute("data-signature-generator", "fonts");
    document.head.appendChild(link);
  }

  ensurePreviewFonts();

  const SOCIAL_LINKS = [
    {
      href: "https://www.instagram.com/yachtway",
      label: "Instagram",
      icon: ASSETS.iconInstagram,
    },
    {
      href: "https://www.youtube.com/@yachtway",
      label: "YouTube",
      icon: ASSETS.iconYoutube,
    },
    {
      href: "https://www.linkedin.com/company/yachtway",
      label: "LinkedIn",
      icon: ASSETS.iconLinkedin,
    },
    {
      href: "https://www.facebook.com/102194509425863",
      label: "Facebook",
      icon: ASSETS.iconFacebook,
    },
  ];

  const PRODUCT_LINKS = [
    {
      href: "https://yachtway.com/boat-insurance/",
      label: "MasterCover",
      itemWidth: 101.63737487792969,
      icon: ASSETS.iconMasterCover,
    },
    {
      href: "https://yachtway.com/easy-fund/",
      label: "Apply for Financing",
      itemWidth: 142.6373748779297,
      icon: ASSETS.iconFinancing,
    },
    {
      href: "https://yachtway.com/yacht-purchase-agreement/",
      label: "EasySign",
      itemWidth: 78.63737487792969,
      icon: ASSETS.iconEasySign,
    },
    {
      href: "https://yachtway.com/studio/",
      label: "YachtWay Studio",
      itemWidth: 128.6373748779297,
      icon: ASSETS.iconStudio,
    },
  ];

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function buildIconMarkup(src, alt, size = ICON_SIZE) {
    return `
      <img
        src="${escapeHtml(src)}"
        alt="${escapeHtml(alt || "")}"
        width="${size}"
        height="${size}"
        style="display:block;width:${size}px;height:${size}px;border:0;outline:none;text-decoration:none;"
      />
    `;
  }

  function buildContactRow(options) {
    const text = escapeHtml(options.text);
    const href = options.href ? ` href="${escapeHtml(options.href)}"` : "";
    const linkOpen = options.href
      ? `<a${href} style="font-family:Figtree,Arial,sans-serif;font-size:14px;line-height:20px;font-weight:400;color:#22222d;text-decoration:none;">`
      : `<span style="font-family:Figtree,Arial,sans-serif;font-size:14px;line-height:20px;font-weight:400;color:#22222d;text-decoration:none;">`;
    const linkClose = options.href ? "</a>" : "</span>";

    return `
      <tr>
        <td style="padding:0;">
          <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="height:28px;">
            <tbody>
              <tr>
                <td style="width:${ICON_SIZE}px;min-width:${ICON_SIZE}px;height:${ICON_SIZE}px;vertical-align:middle;">
                  ${buildIconMarkup(options.icon, options.alt)}
                </td>
                <td style="width:6px;min-width:6px;font-size:0;line-height:0;">&nbsp;</td>
                <td style="vertical-align:middle;">
                  ${linkOpen}${text}${linkClose}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    `;
  }

  function buildSocialLinks(links) {
    const items = (links || SOCIAL_LINKS)
      .map((item, index, list) => {
        const paddingRight = index === list.length - 1 ? 0 : 24;
        return `
          <td style="padding:0 ${paddingRight}px 0 0;vertical-align:middle;">
            <a href="${escapeHtml(item.href)}" target="_blank" style="text-decoration:none;">
              ${buildIconMarkup(item.icon, item.label)}
            </a>
          </td>
        `;
      })
      .join("");

    return `
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:144px;">
        <tbody>
          <tr>
            ${items}
          </tr>
        </tbody>
      </table>
    `;
  }

  function buildProductLinks() {
    const gapWidth = 36.15016174316406;
    const linkTextStyle =
      "font-family:Figtree,Arial,sans-serif;font-size:13px;line-height:20px;font-weight:500;color:#2f2f39;text-decoration:underline;white-space:nowrap;";
    const items = PRODUCT_LINKS.map((item, index) => {
      return `
        <td style="width:${item.itemWidth}px;min-width:${item.itemWidth}px;vertical-align:middle;">
          <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:${item.itemWidth}px;height:22px;">
            <tbody>
              <tr>
                <td style="width:${ICON_SIZE}px;min-width:${ICON_SIZE}px;vertical-align:middle;">
                  <a
                    href="${escapeHtml(item.href)}"
                    target="_blank"
                    style="display:block;text-decoration:none;"
                  >
                    ${buildIconMarkup(item.icon, "")}
                  </a>
                </td>
                <td style="width:4.53px;min-width:4.53px;font-size:0;line-height:0;">&nbsp;</td>
                <td style="vertical-align:middle;">
                  <a
                    href="${escapeHtml(item.href)}"
                    target="_blank"
                    style="${linkTextStyle}"
                  >${escapeHtml(item.label)}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
        ${index === PRODUCT_LINKS.length - 1 ? "" : `<td style="width:${gapWidth}px;min-width:${gapWidth}px;font-size:0;line-height:0;">&nbsp;</td>`}
      `;
    }).join("");

    return `
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:560px;">
        <tbody>
          <tr>
            ${items}
          </tr>
        </tbody>
      </table>
    `;
  }

  function buildImagePanel(person) {
    if (person.image) {
      return `
        <img
          src="${escapeHtml(person.image)}"
          alt="${escapeHtml(person.name)}"
          width="202"
          height="221"
          style="display:block;width:202px;height:221px;border:0;border-radius:4px;outline:none;text-decoration:none;"
        />
      `;
    }

    return `
      <table
        cellpadding="0"
        cellspacing="0"
        border="0"
        role="presentation"
        style="width:202px;height:221px;background:#f4f5f6;border:1px solid rgba(112,128,144,0.04);border-radius:4px;"
      >
        <tbody>
          <tr>
            <td align="center" valign="middle" style="font-family:Figtree,Arial,sans-serif;font-size:14px;line-height:20px;color:rgba(34,34,45,0.6);">
              Photo unavailable
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }

  function buildSignatureHtml(person) {
    const rows = [];

    if (person.calendarLink) {
      rows.push(
        buildContactRow({
          icon: ASSETS.iconCalendar,
          alt: "Calendar",
          text: person.calendarLabel || "Book a Meeting",
          href: person.calendarLink,
        }),
      );
    }

    rows.push(
      buildContactRow({
        icon: ASSETS.iconWebsite,
        alt: "Website",
        text: person.website || "YachtWay.com",
        href: person.websiteLink || "https://yachtway.com",
      }),
    );

    rows.push(
      buildContactRow({
        icon: ASSETS.iconEmail,
        alt: "Email",
        text: person.email,
        href: `mailto:${person.email}`,
      }),
    );

    if (person.phone) {
      rows.push(
        buildContactRow({
          icon: ASSETS.iconPhone,
          alt: "Phone",
          text: person.phone,
          href: person.phoneOpen ? `tel:${person.phoneOpen}` : "",
        }),
      );
    }

    if (person.phone2) {
      rows.push(
        buildContactRow({
          icon: ASSETS.iconPhone,
          alt: "Phone",
          text: person.phone2,
          href: person.phone2Open ? `tel:${person.phone2Open}` : "",
        }),
      );
    }

    const nameWidth = escapeHtml(person.width || "207px");
    const contactRows = rows
      .map((row, index) => `${row}${index === rows.length - 1 ? "" : '<tr><td height="5" style="font-size:0;line-height:0;">&nbsp;</td></tr>'}`)
      .join("");

    return `
      <table
        cellpadding="0"
        cellspacing="0"
        border="0"
        role="presentation"
        style="width:600px;height:315px;border-collapse:collapse;background:#ffffff;font-family:Arial,sans-serif;"
      >
        <tbody>
          <tr>
            <td style="padding:20px 0 20px 20px;vertical-align:top;">
              <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:429px;height:221px;">
                <tbody>
                  <tr>
                    <td style="width:202px;vertical-align:top;padding:0;">
                      ${buildImagePanel(person)}
                    </td>
                    <td style="width:20px;min-width:20px;font-size:0;line-height:0;">&nbsp;</td>
                    <td style="width:207px;vertical-align:top;padding:16px 0 0 0;">
                      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:207px;">
                        <tbody>
                          <tr>
                            <td style="padding:0;">
                              <div style="width:${nameWidth};font-family:Poppins,Arial,sans-serif;font-size:28px;line-height:40px;font-weight:400;color:#22222d;white-space:nowrap;">
                                ${escapeHtml(person.name)}
                              </div>
                              <div style="font-family:Poppins,Arial,sans-serif;font-size:15px;line-height:22px;font-weight:500;color:rgba(34,34,45,0.8);white-space:nowrap;">
                                ${escapeHtml(person.position)}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td height="4" style="font-size:0;line-height:0;">&nbsp;</td>
                          </tr>
                          ${contactRows}
                          <tr>
                            <td height="10" style="font-size:0;line-height:0;">&nbsp;</td>
                          </tr>
                          <tr>
                            <td>${buildSocialLinks(person.socialLinks)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="border-top:1px solid rgba(112,128,144,0.04);padding:16px 20px 16px 20px;vertical-align:top;">
              ${buildProductLinks()}
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }

  function normalizeHtml(htmlContent) {
    return String(htmlContent).replace(/>\s+</g, "><").trim();
  }

  function toPlainText(htmlContent) {
    const temp = document.createElement("div");
    temp.innerHTML = htmlContent;
    return temp.textContent.replace(/\s+/g, " ").trim();
  }

  function showCopyFeedback(button, message) {
    const originalText = button.textContent;
    button.textContent = message;
    button.classList.add("copied");

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("copied");
    }, 2000);
  }

  function copyAsPlainText(htmlContent, button) {
    const plainText = toPlainText(htmlContent);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(plainText)
        .then(() => {
          showCopyFeedback(button, "Copied as text!");
        })
        .catch(() => {
          const textArea = document.createElement("textarea");
          textArea.value = plainText;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          showCopyFeedback(button, "Copied as text!");
        });
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = plainText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showCopyFeedback(button, "Copied as text!");
  }

  function copySignature(htmlContent, button) {
    const cleanHtml = normalizeHtml(htmlContent);
    const plainText = toPlainText(cleanHtml);

    if (navigator.clipboard && navigator.clipboard.write) {
      const clipboardItem = new ClipboardItem({
        "text/html": new Blob([cleanHtml], { type: "text/html" }),
        "text/plain": new Blob([plainText], { type: "text/plain" }),
      });

      navigator.clipboard
        .write([clipboardItem])
        .then(() => {
          showCopyFeedback(button, "Copied!");
        })
        .catch(() => {
          copyAsPlainText(cleanHtml, button);
        });
      return;
    }

    copyAsPlainText(cleanHtml, button);
  }

  function createSignatureContainer(person) {
    const html = buildSignatureHtml(person);
    const signatureContainer = document.createElement("div");
    signatureContainer.className = "signature-container";

    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.textContent = `Copy ${person.name}'s Signature`;
    copyButton.onclick = () => copySignature(html, copyButton);

    const preview = document.createElement("div");
    preview.className = "signature-preview";
    preview.innerHTML = html;

    signatureContainer.appendChild(copyButton);
    signatureContainer.appendChild(preview);

    return signatureContainer;
  }

  function renderSignatureList(data, options) {
    const targetId = (options && options.contentId) || "content";
    const contentDiv = document.getElementById(targetId);

    if (!contentDiv) {
      throw new Error(`Container #${targetId} was not found.`);
    }

    contentDiv.innerHTML = "";
    data.forEach((item) => {
      contentDiv.appendChild(createSignatureContainer(item));
    });
  }

  window.SignatureGenerator = {
    ASSETS,
    buildSignatureHtml,
    copySignature,
    renderSignatureList,
  };
})();
