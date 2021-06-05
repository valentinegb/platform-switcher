import { Plugin } from '@vizality/entities';
import { patch, unpatchAll } from '@vizality/src/core/modules/patcher';
import { getModule } from '@vizality/src/core/modules/webpack';

export default class PlatformSwitcher extends Plugin {
  start () {
    const platform = getModule(m => m.getPlatform);

    patch(platform, 'isWindows', () => {
      return this.settings.get('platform', 0) === 0;
    });

    patch(platform, 'isOSX', () => {
      return this.settings.get('platform', 0) === 1;
    });

    patch(platform, 'isLinux', () => {
      return this.settings.get('platform', 0) === 2;
    });

    // isWeb returns true if previous funtions all return false
  }

  stop () {
    unpatchAll('platform-switcher');
  }
}
