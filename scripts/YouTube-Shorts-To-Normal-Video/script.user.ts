// ==UserScript==
// @name               YouTube Shorts To Normal Video
// @name:de            YouTube-Shorts Zum Normalen Video
// @name:es            Cortos De YouTube A Video Normal
// @name:fr            Short YouTube Vers Vidéo Normale
// @name:hi            यूट्यूब शॉर्ट्स से सामान्य वीडियो तक
// @name:id            YouTube Shorts Ke Video Normal
// @name:it            Da YouTube Shorts A Video Normale
// @name:ja            YouTube ショートから通常の動画へ
// @name:ko            YouTube Shorts를 일반 비디오로
// @name:nl            YouTube Shorts Naar Normale Video
// @name:pt-BR         YouTube Shorts Para Vídeo Normal
// @name:ru            YouTube Shorts В Обычное Видео
// @name:th            YouTube Shorts สู่วิดีโอปกติ
// @name:tr            YouTube Shorts'tan Normal Videoya
// @name:vi            YouTube Shorts Thành Video Bình Thường
// @name:zh-CN         YouTube Shorts 转普通视频
// @name:zh-TW         YouTube Shorts 轉普通視頻
// @namespace          https://github.com/tientq64/userscripts
// @version            1.1.0
// @description        Instantly redirect YouTube Shorts videos to normal video view, allowing you to save, download, choose quality, etc.
// @description:de     Leiten Sie YouTube Shorts-Videos sofort zur normalen Videoansicht weiter, sodass Sie sie speichern, herunterladen, die Qualität auswählen usw. können.
// @description:es     Redirecciona instantáneamente los videos de YouTube Shorts a la vista de video normal, lo que te permite guardarlos, descargarlos, elegir la calidad, etc.
// @description:fr     Redirige instantanément les vidéos YouTube Shorts vers une vue vidéo normale, vous permettant d'enregistrer, de télécharger, de choisir la qualité, etc.
// @description:hi     YouTube शॉर्ट्स वीडियो को तुरंत सामान्य वीडियो दृश्य में पुनर्निर्देशित करें, जिससे आप सहेज सकें, डाउनलोड कर सकें, गुणवत्ता चुन सकें, आदि।
// @description:id     Langsung mengalihkan video YouTube Shorts ke tampilan video normal, sehingga Anda dapat menyimpan, mengunduh, memilih kualitas, dan lain-lain.
// @description:it     Reindirizza immediatamente i video di YouTube Shorts alla visualizzazione video normale, consentendoti di salvare, scaricare, scegliere la qualità, ecc.
// @description:ja     YouTube Shorts 動画を通常の動画ビューに即座にリダイレクトし、保存、ダウンロード、品質の選択などを行うことができます。
// @description:ko     YouTube Shorts 동영상을 일반 동영상 보기로 즉시 리디렉션하여 저장, 다운로드, 품질 선택 등이 가능합니다.
// @description:nl     Stuur YouTube Shorts-video's direct door naar de normale videoweergave, zodat u ze kunt opslaan, downloaden, de kwaliteit kunt kiezen, enz.
// @description:pt-BR  Redirecione instantaneamente os vídeos do YouTube Shorts para a visualização normal, permitindo que você salve, baixe, escolha a qualidade, etc.
// @description:ru     Мгновенно перенаправляет видеоролики YouTube Shorts в обычный режим просмотра, позволяя сохранять, загружать, выбирать качество и т. д.
// @description:th     เปลี่ยนเส้นทางวิดีโอ YouTube Shorts ไปยังมุมมองวิดีโอปกติทันที ช่วยให้คุณบันทึก ดาวน์โหลด เลือกคุณภาพ ฯลฯ ได้
// @description:tr     Redirecciona instantáneamente los videos de YouTube Shorts a la vista de video normal, lo que te permite guardarlos, descargarlos, elegir la calidad, etc.
// @description:vi     Chuyển hướng ngay lập tức video YouTube Shorts sang chế độ xem video thông thường, cho phép bạn lưu, tải xuống, chọn chất lượng, v.v.
// @description:zh-CN  立即将 YouTube Shorts 视频重定向至普通视频视图，让您可以保存、下载、选择质量等。
// @description:zh-TW  立即將 YouTube Shorts 影片重定向到正常影片視圖，以便您儲存、下載、選擇品質等。
// @author             tientq64
// @icon               https://cdn-icons-png.flaticon.com/64/3670/3670147.png
// @match              https://www.youtube.com/*
// @match              https://m.youtube.com/*
// @exclude            https://studio.youtube.com/*
// @license            MIT
// @grant              none
// @noframes
// ==/UserScript==

function redirect(): void {
	const isShorts: boolean = location.pathname.startsWith('/shorts/')
	if (isShorts) {
		const newUrl: string = location.href.replace('/shorts/', '/watch?v=')
		location.replace(newUrl)
	}
}

document.addEventListener('yt-navigate-start', redirect)
redirect()
