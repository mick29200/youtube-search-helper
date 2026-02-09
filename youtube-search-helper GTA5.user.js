// ==UserScript==
// @name         YouTube Search Helper GTA5 – Engineering
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Search assistance tool – recent worldwide results
// @author       Nascheka
// @match        *://www.youtube.com/*
// @match        *://studio.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function makeDraggable(element) {
        let offsetX = 0, offsetY = 0, isDown = false;
        element.addEventListener("mousedown", function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
            isDown = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
        });
        document.addEventListener("mouseup", function() { isDown = false; });
        document.addEventListener("mousemove", function(e) {
            if (!isDown) return;
            element.style.left = (e.clientX - offsetX) + "px";
            element.style.top = (e.clientY - offsetY) + "px";
        });
    }

    function createGlobalTimer() {
        if (document.getElementById("la-timer-global")) return;

        const box = document.createElement("div");
        box.id = "la-timer-global";


        box.style.cssText = "position:fixed; top:120px; left:100px; padding:15px; background:#000; color:#0f0; border:2px solid #00f; border-radius:8px; font-family:monospace; font-size:15px; z-index:9999999; box-shadow: 0 0 25px #00f; text-align:center; width:340px; cursor:grab;";

        const title = document.createElement("div");
        title.textContent = "🌐 For GTA SEARCH";
        title.style.cssText = "margin-bottom:12px; color:#00f; font-weight:bold; font-size:16px; text-shadow: 0 0 5px #00f;";
        box.appendChild(title);

        const searchInput = document.createElement("input");
        searchInput.id = "eng-tags";
        searchInput.placeholder = "ENTER TAGS (ex: gta5 ps5)...";
        searchInput.style.cssText = "width:92%; padding:10px; background:#111; color:#0f0; border:1px solid #00f; margin-bottom:12px; font-size:11px; font-family:monospace;";
        box.appendChild(searchInput);


        const btnGlobal = document.createElement("button");
        btnGlobal.textContent = "🚀 SCAN WORLDWIDE < 24H";
        btnGlobal.style.cssText = "width:96%; padding:15px; background:#00f; color:#fff; border:none; border-radius:5px; font-weight:bold; cursor:pointer; font-size:11px; font-family:monospace; text-transform:uppercase;";

        btnGlobal.onclick = () => {
            const tags = document.getElementById("eng-tags").value;
            if(tags) {

                const globalUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(tags)}&sp=EgQIAhAB&gl=US`;
                window.open(globalUrl, '_blank');
            } else {
                alert("Empty input.");
            }
        };
        box.appendChild(btnGlobal);

        document.body.appendChild(box);
        makeDraggable(box);
    }

    setInterval(createGlobalTimer, 2000);
})();
