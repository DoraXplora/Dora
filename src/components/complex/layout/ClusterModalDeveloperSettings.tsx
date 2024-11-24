import { Switch } from '@components/ui/switch';
import { localStorageIsAvailable } from '@utils/local-storage';
import { Separator } from '@components/ui/separator';

export default function ClusterModalDeveloperSettings() {
  const showDeveloperSettings = localStorageIsAvailable();
  const enableCustomUrl =
    showDeveloperSettings && localStorage.getItem('enableCustomUrl') !== null;
  const onToggleCustomUrlFeature = (enabled: boolean) => {
    if (enabled) {
      localStorage.setItem('enableCustomUrl', '');
    } else {
      localStorage.removeItem('enableCustomUrl');
    }
  };
  if (showDeveloperSettings !== true) {
    return null;
  }
  return (
    <>
      <Separator />
      <h2 className="text-center my-4">Developer Settings</h2>
      <div className="flex align-center justify-between">
        <span>Enable custom url param</span>
        <Switch
          defaultChecked={enableCustomUrl}
          onCheckedChange={onToggleCustomUrlFeature}
        />
      </div>
      <p className="text-slate-500 text-xs mt-3">
        Enable this setting to easily connect to a custom cluster via the
        &ldquo;customUrl&rdquo; url param.
      </p>
    </>
  );
}
