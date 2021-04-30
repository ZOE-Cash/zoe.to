/*
Copyright 2020 The Matrix.org Foundation C.I.C.

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

import {TemplateView} from "./utils/TemplateView.js";
import {OpenLinkView} from "./open/OpenLinkView.js";
import {CreateLinkView} from "./create/CreateLinkView.js";
import {LoadServerPolicyView} from "./policy/LoadServerPolicyView.js";

export class RootView extends TemplateView {
	render(t, vm) {
		return t.div({className: "RootView"}, [
			t.p(t.img({src: "images/logo.png"})),
			t.mapView(vm => vm.openLinkViewModel, vm => vm ? new OpenLinkView(vm) : null),
			t.mapView(vm => vm.createLinkViewModel, vm => vm ? new CreateLinkView(vm) : null),
            t.mapView(vm => vm.loadServerPolicyViewModel, vm => vm ? new LoadServerPolicyView(vm) : null),
			t.div({className: "footer"}, [
				t.p(["This invite uses ", externalLink(t, "https://zoe.community", "ZOE Community"), ", a platform for secure, decentralized communication."]),
				t.ul({className: "links"}, [
					t.li(externalLink(t, "https://zoe.community", "Official site")),
					t.li(externalLink(t, "https://app.zoe.community", "Web App")),
					t.li(externalLink(t, "https://t.me/zoecash", "Telegram")),
					t.li({className: {hidden: vm => !vm.hasPreferences}},
						t.button({className: "text", onClick: () => vm.clearPreferences()}, "Clear preferences")),
				])
			])
		]);
	}
}

function externalLink(t, href, label) {
	return t.a({href, target: "_blank", rel: "noopener noreferrer"}, label);
}
