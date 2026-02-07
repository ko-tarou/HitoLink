import { getMe } from "@/lib/actions/me";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const me = await getMe();
  if (!me) {
    return (
      <div className="mx-auto px-6 py-6 max-w-2xl text-text">
        <p>ログイン情報を取得できませんでした。</p>
      </div>
    );
  }
  return (
    <div className="mx-auto px-6 py-6 max-w-2xl text-text">
      <SettingsForm
        initialOrganizationName={me.organization_name}
        initialBusinessType={me.business_type}
      />
    </div>
  );
}
