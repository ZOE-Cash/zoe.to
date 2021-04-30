/*
Copyright 2020 The ZOE Community Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {Maturity, Platform, LinkKind,
	FDroidLink, AppleStoreLink, PlayStoreLink, WebsiteLink} from "../types.js";

const trustedWebInstances = [
    "app.zoe.community",   // first one is the default one
];

/**
 * Information on how to deep link to a given matrix client.
 */
export class Element {
	get id() { return "app.zoe.community"; }

	get platforms() {
		return [
			Platform.Android, Platform.iOS,
			Platform.Windows, Platform.macOS, Platform.Linux,
			Platform.DesktopWeb
		];
	}

    get icon() { return "images/zoe.svg"; }
    get appleAssociatedAppId() { return "7J4U792NQT.im.vector.app"; }
	get name() {return "ZOE Community"; }
	get description() { return 'Fully-featured ZOE Community client, used by millions.'; }
	get homepage() { return "https://app.zoe.community"; }
	get author() { return "ZOE Community"; }
	getMaturity(platform) { return Maturity.Stable; }

	getDeepLink(platform, link) {
		let fragmentPath;
		switch (link.kind) {
			case LinkKind.User:
				fragmentPath = `user/${link.identifier}`;
				break;
			case LinkKind.Room:
				fragmentPath = `room/${link.identifier}`;
				break;
			case LinkKind.Group:
				fragmentPath = `group/${link.identifier}`;
				break;
			case LinkKind.Event:
				fragmentPath = `room/${link.identifier}/${link.eventId}`;
				break;
		}
        const isWebPlatform = platform === Platform.DesktopWeb || platform === Platform.MobileWeb;
		if (isWebPlatform || platform === Platform.iOS) {
            let instanceHost = trustedWebInstances[0];
            // we use app.element.io which iOS will intercept, but it likely won't intercept any other trusted instances
            // so only use a preferred web instance for true web links.
            if (isWebPlatform && trustedWebInstances.includes(link.webInstances[this.id])) {
                instanceHost = link.webInstances[this.id];
            }
			return `https://${instanceHost}/#/${fragmentPath}`;
		} else if (platform === Platform.Linux || platform === Platform.Windows || platform === Platform.macOS) {
			return `zoecommunity://vector/webapp/#/${fragmentPath}`;
		} else {
            return `zoecommunity://${fragmentPath}`;
        }
	}

	getLinkInstructions(platform, link) {}
    getCopyString(platform, link) {}
	getInstallLinks(platform) {
		switch (platform) {
			case Platform.iOS: return [new AppleStoreLink('vector', 'id1083446067')];
			case Platform.Android: return [new PlayStoreLink('com.zoe.cash')];
			default: return [new WebsiteLink("https://app.zoe.community")];
		}
	}

	canInterceptMatrixToLinks(platform) {
		return platform === Platform.Android;
	}

    getPreferredWebInstance(link) {
        const idx = trustedWebInstances.indexOf(link.webInstances[this.id])
        return idx === -1 ? undefined : trustedWebInstances[idx];
    }
}
