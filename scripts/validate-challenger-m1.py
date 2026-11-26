import tomllib
import pathlib
import sys

files = ['fuji-japanese-in/netlify.toml', 'fuji-japanese-institute/netlify.toml']

all_valid = True

for path_str in files:
    p = pathlib.Path(path_str)
    print("=" * 60)
    print(f"Validating TOML Syntax & Schema: {path_str}")
    print("=" * 60)
    
    if not p.exists():
        print(f"ERROR: File not found: {path_str}")
        all_valid = False
        continue
        
    try:
        content = p.read_text(encoding='utf-8')
        data = tomllib.loads(content)
        print(f"[PASS] TOML syntax parsed successfully via tomllib (TOML v1.0.0).")
    except Exception as e:
        print(f"[FAIL] TOML syntax error: {e}")
        all_valid = False
        continue
        
    print(f"Top-level sections found: {list(data.keys())}")
    
    # Validate build configuration
    if 'build' in data:
        build = data['build']
        print(f"Build command: {build.get('command')}")
        print(f"Publish dir:   {build.get('publish')}")
    else:
        print("[WARN] No [build] section found.")
        
    # Validate redirects schema
    redirects = data.get('redirects', [])
    print(f"Total [[redirects]] rules: {len(redirects)}")
    
    allowed_redirect_keys = {'from', 'to', 'status', 'force', 'query', 'headers', 'conditions', 'signed'}
    redirect_errors = []
    
    for i, r in enumerate(redirects):
        rule_num = i + 1
        # Check unknown keys
        extra = set(r.keys()) - allowed_redirect_keys
        if extra:
            redirect_errors.append(f"Rule #{rule_num}: unknown keys {extra}")
        if 'from' not in r:
            redirect_errors.append(f"Rule #{rule_num}: missing 'from'")
        if 'to' not in r:
            redirect_errors.append(f"Rule #{rule_num}: missing 'to'")
        if 'status' in r and not isinstance(r['status'], int):
            redirect_errors.append(f"Rule #{rule_num}: 'status' is not integer ({type(r['status'])})")
        if 'force' in r and not isinstance(r['force'], bool):
            redirect_errors.append(f"Rule #{rule_num}: 'force' is not boolean ({type(r['force'])})")
        if 'query' in r:
            if not isinstance(r['query'], dict):
                redirect_errors.append(f"Rule #{rule_num}: 'query' is not table/dict ({type(r['query'])})")
            else:
                for qk, qv in r['query'].items():
                    if not isinstance(qk, str) or not isinstance(qv, str):
                        redirect_errors.append(f"Rule #{rule_num}: query param {qk}={qv} must have string key and value")
                        
    if redirect_errors:
        print(f"[FAIL] Found {len(redirect_errors)} redirects schema errors:")
        for err in redirect_errors:
            print(f"  - {err}")
        all_valid = False
    else:
        print(f"[PASS] All {len(redirects)} redirect rules adhere strictly to Netlify schema.")
        
    # Validate headers schema
    headers = data.get('headers', [])
    print(f"Total [[headers]] rules: {len(headers)}")
    for i, h in enumerate(headers):
        if 'for' not in h or 'values' not in h:
            print(f"[FAIL] Header #{i+1} missing 'for' or 'values': {h}")
            all_valid = False
        elif not isinstance(h['values'], dict):
            print(f"[FAIL] Header #{i+1} 'values' must be table/dict")
            all_valid = False
    if headers and all_valid:
        print(f"[PASS] All {len(headers)} header rules adhere strictly to Netlify schema.")
        
    # Validate plugins
    plugins = data.get('plugins', [])
    print(f"Total [[plugins]] rules: {len(plugins)}")
    for i, pl in enumerate(plugins):
        if 'package' not in pl:
            print(f"[FAIL] Plugin #{i+1} missing 'package'")
            all_valid = False
        else:
            print(f"  Plugin: {pl['package']}")
    if plugins and all_valid:
        print(f"[PASS] All {len(plugins)} plugin configurations valid.")
        
print("=" * 60)
if all_valid:
    print("ALL TOML VALIDATION CHECKS PASSED (0 ERRORS)")
    sys.exit(0)
else:
    print("TOML VALIDATION FAILED")
    sys.exit(1)
