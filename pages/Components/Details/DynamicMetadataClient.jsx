"use client";
import { useEffect } from "react";

const DynamicMetadataClient = () => {
    useEffect(() => {
        const handleScroll = () => {
            const elements = document.getElementsByClassName("newsDetail");
            const scrollY = window.scrollY;

            for (let i = 0; i < elements.length; i++) {
                const el = elements[i];
                const rect = el.getBoundingClientRect();
                const topOffset = rect.top + window.scrollY;
                const bottomOffset = topOffset + rect.height;

                if (scrollY >= topOffset && scrollY < bottomOffset) {
                    const id = el.getAttribute("id");
                    const title = el.getAttribute("data-title");
                    const image = el.getAttribute("data-image");

                    if (!id) {
                        console.warn("Missing ID on newsDetail element", el);
                        continue;
                    }

                    const currentId = window.location.pathname.split("/").pop();
                    if (currentId !== id) {
                        // Update title + description
                        document.title = title || "Barta24";
                        const descriptionMeta = document.querySelector("meta[name='description']");
                        if (descriptionMeta) {
                            descriptionMeta.setAttribute("content", title || "Barta24");
                        }

                        // ✅ Update Open Graph + Twitter image
                        updateMetaTag("property", "og:image", image);
                        updateMetaTag("name", "twitter:image", image);

                        // View count (once per session)
                        if (!localStorage.getItem("contentView_" + id)) {
                            localStorage.setItem("contentView_" + id, "1");
                            fetch(`${process.env.NEXT_PUBLIC_API_URL}hit-count/${id}`)
                                .catch((err) => console.error("Hit count error", err));
                        }

                        // Push updated URL
                        const base = window.location.pathname.split("/").slice(0, -1).join("/");
                        const newUrl = `${base}/${id}`;
                        window.history.replaceState(null, null, newUrl);
                    }
                    break;
                }
            }
        };

        const updateMetaTag = (attr, key, value) => {
            let meta = document.querySelector(`meta[${attr}="${key}"]`);
            if (!meta) {
                meta = document.createElement("meta");
                meta.setAttribute(attr, key);
                document.head.appendChild(meta);
            }
            meta.setAttribute("content", value || "");
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return null;
};

export default DynamicMetadataClient;
